interface StatisticSectionProps {
  title: string;
  children: React.ReactNode;
}

const StatisticSection = ({ title, children }: StatisticSectionProps) => (
  <section className='mb-6'>
    <h2 className='mb-4 text-2xl font-bold'>{title}</h2>
    {children}
  </section>
);

export default StatisticSection;
