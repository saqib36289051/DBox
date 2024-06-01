import * as React from "react"
import { Svg, Rect, SvgProps } from "react-native-svg"

type Props = SvgProps & {}
function DashboardIcon(props: Props) {
    return (
        <Svg viewBox="0 0 512 512" {...props}>
            <Rect
                width={151}
                height={151}
                x={73}
                y={73}
                fill="none"
                stroke={props?.stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={28}
                rx={33.03}
                ry={33.03}
            />
            <Rect
                width={151}
                height={151}
                x={288}
                y={73}
                fill="none"
                stroke={props?.stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={28}
                rx={33.03}
                ry={33.03}
            />
            <Rect
                width={151}
                height={151}
                x={73}
                y={288}
                fill="none"
                stroke={props?.stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={28}
                rx={33.03}
                ry={33.03}
            />
            <Rect
                width={151}
                height={151}
                x={288}
                y={288}
                fill="none"
                stroke={props?.stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={28}
                rx={33.03}
                ry={33.03}
            />
        </Svg>
    )
}

export default DashboardIcon
