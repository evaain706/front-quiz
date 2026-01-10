interface StatisticSectionProps {
  title: string;
  children: React.ReactNode;
}

const StatisticSection = ({ title, children }: StatisticSectionProps) => (
  <section className='mb-6'>
    <h2 className='mb-4 text-[1.6rem] font-bold md:text-[2rem]'>{title}</h2>
    {children}
  </section>
);

export default StatisticSection;
