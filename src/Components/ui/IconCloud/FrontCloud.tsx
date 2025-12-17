import { IconCloud } from './IconCloud';

const slugs = [
  'typescript',
  'javascript',
  'java',
  'react',
  'html5',
  'css3',
  'nodedotjs',
  'nextdotjs',
  'vercel',
  'testinglibrary',
  'jest',
  'git',
  'github',
  'gitlab',
  'visualstudiocode',
];

export function FrontCloud() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <div className='relative mt-5 flex size-full h-80 items-center justify-center overflow-hidden'>
      <IconCloud images={images} />
    </div>
  );
}
