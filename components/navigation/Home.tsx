import React from "react"
import { Svg, Path, SvgProps } from "react-native-svg"

type Props = SvgProps & {}
function HomeIcon(props: Props) {
    return (
        <Svg
            viewBox="0 0 48 48" {...props}>
            <Path 
            d="M24.63 5.22c-.37-.29-.88-.29-1.25 0l-20 16c-.43.35-.5.97-.16 1.41.35.43.97.5 1.41.16l.37-.31V42c0 .55.45 1 1 1h36c.55 0 1-.45 1-1V22.48l.38.3c.18.15.4.22.62.22.29 0 .58-.13.78-.38.34-.43.27-1.06-.16-1.41L24.63 5.22zM27 41h-6v-8h6v8zm14 0H29v-9c0-.55-.45-1-1-1h-8c-.55 0-1 .45-1 1v9H7V20.88l17-13.6 17 13.6V41z"
            stroke={props.stroke}
            strokeWidth={props.strokeWidth}
            fill={props.fill} 
            />
        </Svg>
    )
}

export default HomeIcon
