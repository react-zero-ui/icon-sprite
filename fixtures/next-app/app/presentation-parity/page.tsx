import { ArrowDown, Check, Circle } from "@react-zero-ui/icon-sprite"

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
    </main>
  )
}
