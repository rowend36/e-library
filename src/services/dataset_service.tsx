import { Dataset } from "@/data/models/dataset";
import { db, JoinColumn, Selection, Table, Type } from "@/config/database";
import reshape from "@/utils/reshape";
import { uploadAndGetUrl } from "@/config/storage";
import { Knex } from "knex";

export async function getDatasets(limit: number = 100, offset: number = 0) {
  return reshape(
    await db<Dataset>(Type<Table>("datasets"))
      .select<Dataset[]>(
        Type<Selection[]>([
          "datasets.dataset_id",
          "title",
          "pdf_url",
          "description",
          "datasets.created_at",
        ])
      )
      .limit(limit)
      .offset(offset)
  ).map(prefixBucket);
}

async function search<T extends {}>(
  query: string,
  tsvector: string,
  select: ReturnType<Knex<T>["select"]>,
  offset: number,
  limit: number,
  searchSpace = 100
) {
  const preprocessed =
    "(" +
    query
      .replace(/[^-_'\w ]/g, "")
      .split(" ")
      .filter(Boolean)
      .map((e) => e + ":*")
      .join(")|(") +
    ")";
  let result: T[] = [];
  // const tables = (tsvector.match(/\b\w+(?=\.)/g) ?? [])
  //   .sort()
  //   .filter((e, i, a) => e !== a[i - 1])
  //   .reduce((acc, e) => ((acc[e] = e), acc), {} as Record<string, string>);
  let subquery = select
    .select(
      db.raw(
        `ts_rank(${tsvector}, to_tsquery(?)) AS rank`,

        [preprocessed]
      )
    )
    .whereRaw(`${tsvector} @@ to_tsquery(?)`, [preprocessed]);
  while (searchSpace <= 400) {
    let mainQuery: any;
    if (searchSpace < 400) {
      subquery = subquery.limit(searchSpace);
      mainQuery = db
        .select("*")
        .from(subquery)
        .orderBy("rank", "desc")
        .offset(offset)
        .limit(limit);
    } else {
      // From tests, the query planner is actually smart enough to figure this out.
      mainQuery = subquery.orderBy("rank", "desc").offset(offset).limit(limit);
    }

    result = await mainQuery;
    if (result.length >= limit) {
      return reshape<any, T>(result);
    }
    searchSpace *= 2;
  }

  return result;
}

export async function deleteDataset(dataset_id: number) {
  return db<Dataset>(Type<Table>("datasets"))
    .where("dataset_id", dataset_id)
    .delete();
}

export async function searchDatasets(
  query: string,
  limit: number = 100,
  offset: number = 0,
  laxLevel = 1
) {
  return (
    await search<Dataset>(
      query,
      "datasets.tsv",
      db<Dataset>(Type<Table>("datasets")).select(
        Type<Selection<Dataset>[]>([
          "datasets.dataset_id",
          "title",
          "pdf_url",
          "description",
          "datasets.created_at",
        ])
      ),
      offset,
      limit
    )
  ).map(prefixBucket);
}

const prefixBucket = (e: Dataset) => {
  if (e.pdf_url)
    e.pdf_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${e.pdf_url}`;
  return e;
};

export async function addDataset({ ...dataset }: Dataset) {
  return (
    await db<Dataset>(Type<Table>("datasets"))
      .insert(dataset)
      .returning("dataset_id")
  )[0].dataset_id;
}

export async function getDatasetCount() {
  return (await db<Dataset>(Type<Table>("datasets")).count())[0]
    .count as number;
}
