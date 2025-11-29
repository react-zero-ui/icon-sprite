import {
  ArrowRight,
  AArrowDown,
  AArrowUp,
  ALargeSmall,
  Accessibility,
  Activity,
  AlarmClockCheck,
  AlarmClock,
  AlarmClockMinus,
  AlarmClockOff,
  AlarmClockPlus,
  AlarmSmoke,
  Album,
  AlignCenterHorizontal,
  CustomIcon,
  ArrowDown10,
  ArrowDownAZ,
} from "@react-zero-ui/icon-sprite"

const iconNames = [AArrowDown, AArrowUp, ALargeSmall, Accessibility, Activity]

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-40 text-8xl font-black uppercase">
      NEXT.js Starter
      <ArrowRight className="h-20 w-20" />
      <ArrowDown10 className="h-20 w-20" />
      <div className="grid grid-cols-10 gap-1 **:rounded-lg **:bg-blue-500 **:text-white">
        {/*  */}
        {iconNames.map((icon, index) => {
          const Icon = icon
          return <Icon key={index + `${icon}`} className="h-20 w-20" />
        })}
        <div className="flex-center border border-red-800">
          <CustomIcon name="google-ads" size={80} className="h-20 w-20 fill-red-500! text-red-500" />
          <CustomIcon name="ai" size={80} className="h-20 w-20 fill-red-500!" />
          <CustomIcon name="react-svgrepo-com" size={80} className="h-20 w-20 fill-red-500!" />
        </div>
        <AlarmClockCheck size={80} color="#000" strokeWidth={3} />
        <AlarmClockMinus size={80} className="h-20 w-20 fill-red-500" />
        <ArrowDownAZ className="h-20 w-20 text-red-500" />
        <AlarmClockOff className="h-20 w-20" />
        <AlarmClockPlus className="h-20 w-20" />
        <AlarmClock className="h-20 w-20" />
        <AlarmSmoke size={80} />
        <Album className="h-20 w-20" />
        <AlignCenterHorizontal className="h-20 w-20" />
        <div className="h-20 w-20">
          <Album size={80} />
        </div>{" "}
        <div className="h-20 w-20">
          <AlignCenterHorizontal size={80} />
        </div>
      </div>
    </div>
  )
}
export default Home
