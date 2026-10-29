import {
  ArrowDown,
  Check,
  Circle,
  CustomIcon,
  IconCheck,
  IconHeartFilled,
  IconStarFilled,
} from "@react-zero-ui/icon-sprite"

const iconProps = { size: 64 } as const

export default function PresentationParity() {
  return (
    <main
      style={{
        alignItems: "center",
        display: "grid",
        gap: 24,
        gridTemplateColumns: "repeat(4, 64px)",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <ArrowDown data-testid="default" {...iconProps} />
      <span style={{ color: "rgb(255, 128, 0)" }}>
        <ArrowDown className="text-black" data-testid="text-color" {...iconProps} />
      </span>
      <ArrowDown
        color="rgb(0, 0, 255)"
        data-testid="stroke-over-color"
        stroke="rgb(255, 0, 0)"
        {...iconProps}
      />
      <Circle data-testid="fill" fill="rgb(255, 0, 0)" stroke="rgb(0, 0, 255)" {...iconProps} />
      <Check data-testid="stroke-width" strokeWidth={4} {...iconProps} />
      <ArrowDown data-testid="line-cap" strokeLinecap="square" {...iconProps} />
      <Check data-testid="line-join" strokeLinejoin="bevel" {...iconProps} />
      <IconCheck data-testid="tabler-default" {...iconProps} />
      <Check
        aria-hidden={false}
        aria-label="Check"
        data-testid="accessible"
        role="img"
        {...iconProps}
      />
      <IconHeartFilled data-testid="filled-default" {...iconProps} />
      <span style={{ color: "rgb(255, 128, 0)" }}>
        <IconStarFilled className="text-black" data-testid="filled-text-color" {...iconProps} />
      </span>
      <IconHeartFilled
        color="rgb(0, 0, 255)"
        data-testid="filled-fill-over-color"
        fill="rgb(255, 0, 0)"
        {...iconProps}
      />
      <IconStarFilled
        data-testid="filled-stroke"
        stroke="rgb(0, 0, 255)"
        strokeLinecap="square"
        strokeLinejoin="bevel"
        strokeWidth={4}
        {...iconProps}
      />
      <span
        style={{
          stroke: "rgb(0, 128, 0)",
          strokeLinecap: "square",
          strokeLinejoin: "bevel",
          strokeWidth: 3,
        }}
      >
        <IconStarFilled data-testid="filled-inherited-stroke" {...iconProps} />
      </span>
      <span style={{ color: "rgb(0, 0, 255)", fill: "rgb(255, 0, 0)" }}>
        <IconHeartFilled data-testid="filled-undefined-fill" fill={undefined} {...iconProps} />
      </span>
      <IconHeartFilled
        aria-hidden={false}
        aria-label="Favorite"
        data-testid="filled-accessible"
        role="img"
        {...iconProps}
      />
      <CustomIcon
        color="orange"
        data-testid="custom-fixed"
        fill="lime"
        name="parity-fixed"
        stroke="purple"
        {...iconProps}
      />
      <CustomIcon
        color="black"
        data-testid="custom-fixed-again"
        fill="yellow"
        name="parity-fixed"
        stroke="cyan"
        {...iconProps}
      />
      <CustomIcon
        data-testid="custom-inherit"
        fill="red"
        name="parity-inherit"
        stroke="blue"
        strokeWidth={2}
        {...iconProps}
      />
      <CustomIcon
        color="blue"
        data-testid="custom-current-color"
        fill="red"
        name="parity-current-color"
        {...iconProps}
      />
      <CustomIcon data-testid="custom-nested" name="parity-nested" {...iconProps} />
    </main>
  )
}
