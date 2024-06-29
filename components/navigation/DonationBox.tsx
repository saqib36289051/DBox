import React from "react"
import { Svg, Path, SvgProps } from "react-native-svg"

type Props = SvgProps & {}

function DonationBoxIcon(props: Props) {
    return (
        <Svg viewBox="0 0 70 70" {...props}>
            <Path
                stroke={props.stroke}
                fill={props.fill}
                strokeWidth={props.strokeWidth}
                d="M36.66 46.15l-4 1.45a1 1 0 10.68 1.88l4-1.45a1 1 0 00-.68-1.88zm-3.66-.6a1 1 0 00.34-.06l2-.73a1 1 0 00-.68-1.88l-2 .73a1 1 0 00.34 1.94z" />
            <Path
                stroke={props.stroke}
                fill={props.fill}
                strokeWidth={props.strokeWidth}
                d="M59 35a11 11 0 00-8-10.57V18a1 1 0 00-.07-.35v-.1a1 1 0 00-.14-.2l-.08-.08a1 1 0 00-.21-.14h-.08l-22-8a1 1 0 00-.68 0l-22 8h-.08a1 1 0 00-.21.14l-.08.08a1 1 0 00-.14.2v.1A1 1 0 005 18v30a1 1 0 00.66.94l22 8A1 1 0 0028 57a1 1 0 00.3-.05l22-8A1 1 0 0051 48v-2.43A11 11 0 0059 35zM28 24.94l-3.52-1.28 17.9-7.32L47.07 18zm-13-2.6l5 1.82v4.43l-2.29-2.29a1 1 0 00-1-.24l-1.71.55zm2-1.41l18.37-7a1 1 0 00.2-.12l4.08 1.49-18 7.34zm11-9.87l4.74 1.73-18.63 7.1L8.93 18zM7 47.3V19.43l6 2.18V28a1 1 0 001.32.95l2.41-.8 3.56 3.56A1 1 0 0022 31v-6.12l5 1.82v27.87zm42 0l-20 7.27V26.7l20-7.27v4.62c-.33 0-.66-.05-1-.05a11 11 0 000 22c.34 0 .67 0 1-.05zM48 44a9 9 0 119-9 9 9 0 01-9 9z" />
            <Path
                stroke={props.stroke}
                fill={props.fill}
                strokeWidth={props.strokeWidth}
                d="M52 34h-3v-3a1 1 0 00-2 0v3h-3a1 1 0 000 2h3v3a1 1 0 002 0v-3h3a1 1 0 000-2z" />
        </Svg>
    )
}

export default DonationBoxIcon


