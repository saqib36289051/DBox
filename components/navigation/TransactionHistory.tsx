import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path, SvgProps } from "react-native-svg"
type Props = SvgProps & {}

const TransactionHistory = (props: Props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        {...props}
    >
        <Defs>
            <LinearGradient
                id="a"
                x1={28.99}
                x2={45.27}
                y1={38.19}
                y2={38.19}
                gradientUnits="userSpaceOnUse"
            >
                <Stop offset={0} stopColor="#6cc4c7" />
                <Stop offset={0.81} stopColor="#35398e" />
            </LinearGradient>
            <LinearGradient
                xlinkHref="#a"
                id="b"
                x1={18.25}
                x2={56.01}
                y1={62.8}
                y2={62.8}
            />
            <LinearGradient
                xlinkHref="#a"
                id="c"
                x1={18.25}
                x2={56.01}
                y1={71.68}
                y2={71.68}
            />
            <LinearGradient
                xlinkHref="#a"
                id="d"
                x1={18.25}
                x2={56.01}
                y1={80.55}
                y2={80.55}
            />
            <LinearGradient xlinkHref="#a" id="e" x1={3} x2={97} y1={50} y2={50} />
        </Defs>
        <Path
            fill="url(#a)"
            d="M36.86 48.2c-2.73 0-5-1.89-5-4.22H29c0 3.77 3.24 6.85 7.33 7.11V53h2.91v-2.2a7.26 7.26 0 0 0 5.5-6.8 7.38 7.38 0 0 0-6.51-7 1.46 1.46 0 0 0-.55-.11c-2.58 0-4.68-1.78-4.68-4s2.1-4 4.68-4 4.68 1.78 4.68 4h2.91a7.09 7.09 0 0 0-6-6.73v-2.77h-2.95v2.74a7.11 7.11 0 0 0-6.23 6.76 7.11 7.11 0 0 0 6.21 6.76 1.31 1.31 0 0 0 .56.12c2.74 0 5 1.89 5 4.21s-2.26 4.22-5 4.22Z"
        />
        <Path fill="url(#b)" d="M18.25 61.34h37.76v2.91H18.25z" />
        <Path fill="url(#c)" d="M18.25 70.22h37.76v2.91H18.25z" />
        <Path fill="url(#d)" d="M18.25 79.1h37.76v2.91H18.25z" />
        <Path
            fill="url(#e)"
            d="M74.23 20a22.7 22.7 0 0 0-8.89 1.81v-3.76a1.46 1.46 0 0 0-1.46-1.46h-4.46v-5.45A1.46 1.46 0 0 0 58 9.68H4.46A1.46 1.46 0 0 0 3 11.14V82a1.46 1.46 0 0 0 1.46 1.46h4.46v5.45a1.46 1.46 0 0 0 1.45 1.46h53.51a1.46 1.46 0 0 0 1.46-1.46V63.75a22.53 22.53 0 0 0 8.89 1.81 22.77 22.77 0 1 0 0-45.53ZM8.92 18v62.5h-3V12.6h50.6v4H10.37a1.45 1.45 0 0 0-1.45 1.45Zm53.5 69.4H11.83V19.5h50.59v3.84a22.77 22.77 0 0 0 0 38.92Zm13.27-24.82V57h-2.91v5.59a19.87 19.87 0 0 1-18.32-18.1h5.8v-2.93h-5.82A19.85 19.85 0 0 1 72.78 23v6h2.91v-6A19.85 19.85 0 0 1 94 41.56h-5.79v2.92H94a19.86 19.86 0 0 1-18.31 18.1Z"
        />
        <Path
            fill="#384797"
            d="m72.78 42.24-10.42 11.5 2.16 1.95 10.79-11.92a1.39 1.39 0 0 0 .38-1v-7.22h-2.91Z"
        />
    </Svg>
)
export default TransactionHistory
