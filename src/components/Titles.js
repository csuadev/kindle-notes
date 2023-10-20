const Titles = ({ titles }) => (
  <div className='flex flex-wrap'>
    {titles.map((title, index) => (
      <div key={index} className='px-4 py-2 my-1 rounded-full border border-blue-400'>
        <span>{title}</span>
      </div>
    ))}
  </div>
);

export default Titles