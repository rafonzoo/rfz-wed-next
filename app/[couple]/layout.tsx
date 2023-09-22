import type { RFC } from '@/type'

const WeddingLayout: RFC = ({ children }) => {
  return (
    <div
      id='scroller'
      className='absolute left-0 top-0 h-full min-h-[525px] w-full overflow-y-auto overflow-x-hidden'
      style={{
        perspective: '1px',
        perspectiveOrigin: 'left top',
      }}
    >
      {children}
    </div>
  )
}

export default WeddingLayout
