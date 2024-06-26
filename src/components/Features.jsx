import React from 'react';

const Features = () => {
  return (
    <section id='features'>
      {/* Flex Container */}
      <div className='container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row'>
        {/* What's Different */}
        <div className='flex flex-col space-y-12 md:w-1/2'>
          <h2 className='max-w-md text-4xl font-bold text-center md:text-left'>
            What's different about NYSC Library?
          </h2>
          <p className='max-w-sm text-center text-darkGrayishBlue md:text-left'>
            NYSC Library provides all the functionality you need for research, without the
            complexity. Our software is tailor-made for every kind of user.
          </p>
        </div>

        {/* Numbered List */}
        <div className='flex flex-col space-y-8 md:w-1/2'>
          {/* List Item 1 */}
          <div className='flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row'>
            {/* Heading */}
            <div className='rounded-l-full bg-primarySupLight md:bg-transparent'>
              <div className='flex items-center space-x-2'>
                <div className='px-4 py-2 text-white rounded-full md:py-1 bg-primary'>
                  01
                </div>
                <h3 className='text-base font-bold md:mb-4 md:hidden'>
                  Interactive Reading Experience
                </h3>
              </div>
            </div>

            <div>
              <h3 className='hidden mb-4 text-lg font-bold md:block'>
              Interactive Reading Experience
              
              </h3>
              <p className='text-darkGrayishBlue'>
              Immerse yourself in a truly interactive reading experience. Highlight and annotate text, bookmark pages, and add personal notes to enhance your understanding and retention. Our intuitive interface makes it easy to engage with the content and customize your reading experience to suit your preferences.
              </p>
            </div>
          </div>

          {/* List Item 2 */}
          <div className='flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row'>
            {/* Heading */}
            <div className='rounded-l-full bg-primarySupLight md:bg-transparent'>
              <div className='flex items-center space-x-2'>
                <div className='px-4 py-2 text-white rounded-full md:py-1 bg-primary'>
                  02
                </div>
                <h3 className='text-base font-bold md:mb-4 md:hidden'>
                  Advanced built-in reports
                </h3>
              </div>
            </div>

            <div>
              <h3 className='hidden mb-4 text-lg font-bold md:block'>
                Advanced built-in reports
              </h3>
              <p className='text-darkGrayishBlue'>
                Set internal delivery estimates and track progress toward
                company goals. Our customisable dashboard helps you build out
                the reports you need to keep key stakeholders informed.
              </p>
            </div>
          </div>

          {/* List Item 3 */}
          <div className='flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row'>
            {/* Heading */}
            <div className='rounded-l-full bg-primarySupLight md:bg-transparent'>
              <div className='flex items-center space-x-2'>
                <div className='px-4 py-2 text-white rounded-full md:py-1 bg-primary'>
                  03
                </div>
                <h3 className='text-base font-bold md:mb-4 md:hidden'>
                  Everything you need in one place
                </h3>
              </div>
            </div>

            <div>
              <h3 className='hidden mb-4 text-lg font-bold md:block'>
                Everything you need in one place
              </h3>
              <p className='text-darkGrayishBlue'>
                Stop jumping from one service to another to communicate, store
                files, track tasks and share documents. NYSC Library offers an
                all-in-one research solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
