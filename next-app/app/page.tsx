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
  IconZzz,
  IconBellZ,
  IconAccessible,
  IconAccessibleOff,
  IconBellBolt,
  IconBell,
  IconBrandGoogle,
  IconBrandGolang,
  IconGoGame,
  IconZodiacVirgo,
  IconZodiacLibra,
  IconZodiacPisces,
  IconZodiacSagittarius,
  IconZodiacScorpio,
  IconZodiacTaurus,

} from "@react-zero-ui/icon-sprite"

const iconNames = [AArrowDown, AArrowUp, ALargeSmall, Accessibility, Activity]

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-40 text-8xl font-black uppercase">
      NEXT.js Starter

      {/* Tabler icons */}
      <div className="grid grid-cols-10 gap-1 **:rounded-lg **:bg-blue-500  ">
        <IconAccessible className="h-20 w-20" fill="red" strokeWidth={1}/>
        <IconZzz className="h-20 w-20" strokeWidth={3}/>
        <IconBellZ className="h-20 w-20" />
        {/* <IconAccessible className="h-20 w-20" /> */}
        <IconAccessibleOff className="h-20 w-20" />
        <IconBellBolt className="h-20 w-20" />
        <IconBell className="h-20 w-20" fill="red" />
        <IconBrandGoogle className="h-20 w-20" />
        <IconBrandGolang className="h-20 w-20" />
        <IconGoGame className="h-20 w-20" />
        <IconZodiacVirgo className="h-20 w-20" />
        <IconZodiacLibra className="h-20 w-20" />
        <IconZodiacPisces className="h-20 w-20" />
        <IconZodiacSagittarius className="h-20 w-20" />
        <IconZodiacScorpio className="h-20 w-20" />
        <IconZodiacTaurus className="h-20 w-20" />
        <IconZodiacVirgo className="h-20 w-20" />
        <IconZodiacLibra className="h-20 w-20" />
        <IconZodiacPisces className="h-20 w-20" />
        <IconZodiacSagittarius className="h-20 w-20" />
        <IconZodiacScorpio className="h-20 w-20" />
        <IconZodiacTaurus className="h-20 w-20" />
    </div>


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
