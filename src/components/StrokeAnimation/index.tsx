/*
 * @Author: Pacific_D
 * @Date: 2022-08-05 19:48:10
 * @LastEditTime: 2022-08-05 20:30:59
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\StrokeAnimation\index.tsx
 */

import React, { FC, useEffect } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { Easing, useSharedValue, withTiming } from "react-native-reanimated"
import Svg, { Path } from "react-native-svg"
import AnimatedStroke from "./AnimatedStroke"

const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "FE8777"]
const MARGIN = 10
const vWidth = 597 + MARGIN
const vHeight = 381 + MARGIN
const width = Dimensions.get("window").width - 64
const height = (width * vHeight) / vWidth
const paths = [
  "M33.857 142C32.5237 142 31.3903 141.533 30.457 140.6C29.5237 139.667 29.057 138.533 29.057 137.2V7.00001C29.057 5.53333 29.5237 4.33333 30.457 3.4C31.3903 2.46667 32.5237 2 33.857 2H85.657C101.79 2 114.524 5.73333 123.857 13.2C133.19 20.6667 137.857 31.5333 137.857 45.8C137.857 55.6667 135.39 63.8667 130.457 70.4C125.657 76.9333 119.19 81.6667 111.057 84.6L140.257 135.6C140.657 136.4 140.857 137.133 140.857 137.8C140.857 139 140.39 140 139.457 140.8C138.657 141.6 137.724 142 136.657 142H118.457C116.19 142 114.457 141.4 113.257 140.2C112.057 139 111.124 137.8 110.457 136.6L84.657 89.2H56.857V137.2C56.857 138.533 56.3903 139.667 55.457 140.6C54.657 141.533 53.5237 142 52.057 142H33.857ZM56.857 66.6H85.057C93.1903 66.6 99.257 64.8 103.257 61.2C107.257 57.4667 109.257 52.2667 109.257 45.6C109.257 38.9333 107.257 33.7333 103.257 30C99.3903 26.1333 93.3237 24.2 85.057 24.2H56.857V66.6Z",
  "M204.855 144C190.055 144 178.322 139.733 169.655 131.2C160.989 122.667 156.322 110.533 155.655 94.8C155.522 93.4667 155.455 91.8 155.455 89.8C155.455 87.6667 155.522 86 155.655 84.8C156.189 74.6667 158.455 66 162.455 58.8C166.589 51.4667 172.255 45.8667 179.455 42C186.655 38 195.122 36 204.855 36C215.655 36 224.722 38.2667 232.055 42.8C239.389 47.2 244.922 53.4 248.655 61.4C252.389 69.2667 254.255 78.4 254.255 88.8V93C254.255 94.3333 253.789 95.4667 252.855 96.4C251.922 97.3333 250.722 97.8 249.255 97.8H182.855C182.855 97.8 182.855 98 182.855 98.4C182.855 98.8 182.855 99.1333 182.855 99.4C182.989 104.067 183.855 108.4 185.455 112.4C187.189 116.267 189.655 119.4 192.855 121.8C196.189 124.2 200.122 125.4 204.655 125.4C208.389 125.4 211.522 124.867 214.055 123.8C216.589 122.6 218.655 121.267 220.255 119.8C221.855 118.333 222.989 117.133 223.655 116.2C224.855 114.6 225.789 113.667 226.455 113.4C227.255 113 228.389 112.8 229.855 112.8H247.055C248.389 112.8 249.455 113.2 250.255 114C251.189 114.8 251.589 115.8 251.455 117C251.322 119.133 250.189 121.733 248.055 124.8C246.055 127.867 243.122 130.867 239.255 133.8C235.389 136.733 230.522 139.2 224.655 141.2C218.922 143.067 212.322 144 204.855 144ZM182.855 81H227.055V80.4C227.055 75.2 226.189 70.6667 224.455 66.8C222.722 62.8 220.189 59.7333 216.855 57.6C213.522 55.3333 209.522 54.2 204.855 54.2C200.189 54.2 196.189 55.3333 192.855 57.6C189.522 59.7333 186.989 62.8 185.255 66.8C183.655 70.6667 182.855 75.2 182.855 80.4V81Z",
  "M305.685 144C298.752 144 292.485 142.667 286.885 140C281.285 137.2 276.818 133.533 273.485 129C270.285 124.333 268.685 119.133 268.685 113.4C268.685 104.067 272.485 96.6667 280.085 91.2C287.685 85.6 297.618 81.8667 309.885 80L337.285 76V71.8C337.285 66.2 335.885 61.8667 333.085 58.8C330.285 55.7333 325.485 54.2 318.685 54.2C313.885 54.2 309.952 55.2 306.885 57.2C303.952 59.0667 301.752 61.6 300.285 64.8C299.218 66.5333 297.685 67.4 295.685 67.4H279.885C278.418 67.4 277.285 67 276.485 66.2C275.818 65.4 275.485 64.3333 275.485 63C275.618 60.8667 276.485 58.2667 278.085 55.2C279.818 52.1333 282.352 49.2 285.685 46.4C289.152 43.4667 293.618 41 299.085 39C304.552 37 311.152 36 318.885 36C327.285 36 334.352 37.0667 340.085 39.2C345.952 41.2 350.618 43.9333 354.085 47.4C357.552 50.8667 360.085 54.9333 361.685 59.6C363.285 64.2667 364.085 69.2 364.085 74.4V137.2C364.085 138.533 363.618 139.667 362.685 140.6C361.752 141.533 360.618 142 359.285 142H343.085C341.618 142 340.418 141.533 339.485 140.6C338.685 139.667 338.285 138.533 338.285 137.2V129.4C336.552 131.8 334.218 134.133 331.285 136.4C328.352 138.667 324.752 140.533 320.485 142C316.352 143.333 311.418 144 305.685 144ZM312.485 125C317.152 125 321.352 124 325.085 122C328.952 120 331.952 116.933 334.085 112.8C336.352 108.533 337.485 103.2 337.485 96.8V92.6L317.485 95.8C309.618 97 303.752 98.9333 299.885 101.6C296.018 104.267 294.085 107.533 294.085 111.4C294.085 114.333 294.952 116.867 296.685 119C298.552 121 300.885 122.533 303.685 123.6C306.485 124.533 309.418 125 312.485 125Z",
  "M434.743 144C425.143 144 416.676 142.2 409.343 138.6C402.143 135 396.476 129.8 392.343 123C388.343 116.067 386.143 107.733 385.743 98C385.61 96 385.543 93.4 385.543 90.2C385.543 86.8667 385.61 84.1333 385.743 82C386.143 72.2667 388.343 64 392.343 57.2C396.476 50.2667 402.143 45 409.343 41.4C416.676 37.8 425.143 36 434.743 36C443.276 36 450.543 37.2 456.543 39.6C462.543 41.8667 467.476 44.8667 471.343 48.6C475.21 52.2 478.076 56 479.943 60C481.943 63.8667 483.01 67.4 483.143 70.6C483.276 72.0667 482.81 73.2667 481.743 74.2C480.81 75 479.676 75.4 478.343 75.4H460.743C459.41 75.4 458.343 75.0667 457.543 74.4C456.876 73.7333 456.21 72.7333 455.543 71.4C453.543 66.0667 450.876 62.3333 447.543 60.2C444.343 57.9333 440.21 56.8 435.143 56.8C428.476 56.8 423.143 58.9333 419.143 63.2C415.276 67.3333 413.21 73.9333 412.943 83C412.676 88.0667 412.676 92.7333 412.943 97C413.21 106.2 415.276 112.867 419.143 117C423.143 121.133 428.476 123.2 435.143 123.2C440.343 123.2 444.543 122.133 447.743 120C450.943 117.733 453.543 113.933 455.543 108.6C456.21 107.267 456.876 106.267 457.543 105.6C458.343 104.933 459.41 104.6 460.743 104.6H478.343C479.676 104.6 480.81 105.067 481.743 106C482.81 106.8 483.276 107.933 483.143 109.4C483.01 111.8 482.343 114.533 481.143 117.6C480.076 120.533 478.276 123.6 475.743 126.8C473.343 129.867 470.276 132.733 466.543 135.4C462.81 137.933 458.276 140 452.943 141.6C447.743 143.2 441.676 144 434.743 144Z",
  "M551.001 142C543.001 142 536.267 140.6 530.801 137.8C525.334 135 521.267 130.867 518.601 125.4C515.934 119.8 514.601 112.867 514.601 104.6V59.2H498.801C497.467 59.2 496.334 58.7333 495.401 57.8C494.467 56.8667 494.001 55.6667 494.001 54.2V42.8C494.001 41.4667 494.467 40.3333 495.401 39.4C496.334 38.4667 497.467 38 498.801 38H514.601V4.8C514.601 3.46667 515.001 2.33334 515.801 1.40001C516.734 0.466669 517.934 0 519.401 0H535.601C536.934 0 538.067 0.466669 539.001 1.40001C539.934 2.33334 540.401 3.46667 540.401 4.8V38H565.401C566.734 38 567.867 38.4667 568.801 39.4C569.734 40.3333 570.201 41.4667 570.201 42.8V54.2C570.201 55.6667 569.734 56.8667 568.801 57.8C567.867 58.7333 566.734 59.2 565.401 59.2H540.401V102.6C540.401 108.067 541.334 112.333 543.201 115.4C545.201 118.467 548.601 120 553.401 120H567.201C568.534 120 569.667 120.467 570.601 121.4C571.534 122.333 572.001 123.467 572.001 124.8V137.2C572.001 138.533 571.534 139.667 570.601 140.6C569.667 141.533 568.534 142 567.201 142H551.001Z",
  "M5.5367 379C4.20336 379 3.07003 378.533 2.13669 377.6C1.20336 376.667 0.736694 375.533 0.736694 374.2V244C0.736694 242.533 1.20336 241.333 2.13669 240.4C3.07003 239.467 4.20336 239 5.5367 239H20.9367C22.8034 239 24.1367 239.467 24.9367 240.4C25.87 241.2 26.47 241.8 26.7367 242.2L84.3367 331.8V244C84.3367 242.533 84.7367 241.333 85.5367 240.4C86.47 239.467 87.67 239 89.1367 239H105.937C107.403 239 108.603 239.467 109.537 240.4C110.47 241.333 110.937 242.533 110.937 244V374C110.937 375.467 110.47 376.667 109.537 377.6C108.603 378.533 107.47 379 106.137 379H90.5367C88.67 379 87.3367 378.533 86.5367 377.6C85.7367 376.667 85.1367 376.067 84.7367 375.8L27.3367 288.2V374.2C27.3367 375.533 26.87 376.667 25.9367 377.6C25.0034 378.533 23.8034 379 22.3367 379H5.5367Z",
  "M169.943 381C163.01 381 156.743 379.667 151.143 377C145.543 374.2 141.076 370.533 137.743 366C134.543 361.333 132.943 356.133 132.943 350.4C132.943 341.067 136.743 333.667 144.343 328.2C151.943 322.6 161.876 318.867 174.143 317L201.543 313V308.8C201.543 303.2 200.143 298.867 197.343 295.8C194.543 292.733 189.743 291.2 182.943 291.2C178.143 291.2 174.21 292.2 171.143 294.2C168.21 296.067 166.01 298.6 164.543 301.8C163.476 303.533 161.943 304.4 159.943 304.4H144.143C142.676 304.4 141.543 304 140.743 303.2C140.076 302.4 139.743 301.333 139.743 300C139.876 297.867 140.743 295.267 142.343 292.2C144.076 289.133 146.61 286.2 149.943 283.4C153.41 280.467 157.876 278 163.343 276C168.81 274 175.41 273 183.143 273C191.543 273 198.61 274.067 204.343 276.2C210.21 278.2 214.876 280.933 218.343 284.4C221.81 287.867 224.343 291.933 225.943 296.6C227.543 301.267 228.343 306.2 228.343 311.4V374.2C228.343 375.533 227.876 376.667 226.943 377.6C226.01 378.533 224.876 379 223.543 379H207.343C205.876 379 204.676 378.533 203.743 377.6C202.943 376.667 202.543 375.533 202.543 374.2V366.4C200.81 368.8 198.476 371.133 195.543 373.4C192.61 375.667 189.01 377.533 184.743 379C180.61 380.333 175.676 381 169.943 381ZM176.743 362C181.41 362 185.61 361 189.343 359C193.21 357 196.21 353.933 198.343 349.8C200.61 345.533 201.743 340.2 201.743 333.8V329.6L181.743 332.8C173.876 334 168.01 335.933 164.143 338.6C160.276 341.267 158.343 344.533 158.343 348.4C158.343 351.333 159.21 353.867 160.943 356C162.81 358 165.143 359.533 167.943 360.6C170.743 361.533 173.676 362 176.743 362Z",
  "M300.024 379C292.024 379 285.291 377.6 279.824 374.8C274.358 372 270.291 367.867 267.624 362.4C264.958 356.8 263.624 349.867 263.624 341.6V296.2H247.824C246.491 296.2 245.358 295.733 244.424 294.8C243.491 293.867 243.024 292.667 243.024 291.2V279.8C243.024 278.467 243.491 277.333 244.424 276.4C245.358 275.467 246.491 275 247.824 275H263.624V241.8C263.624 240.467 264.024 239.333 264.824 238.4C265.758 237.467 266.958 237 268.424 237H284.624C285.958 237 287.091 237.467 288.024 238.4C288.958 239.333 289.424 240.467 289.424 241.8V275H314.424C315.758 275 316.891 275.467 317.824 276.4C318.758 277.333 319.224 278.467 319.224 279.8V291.2C319.224 292.667 318.758 293.867 317.824 294.8C316.891 295.733 315.758 296.2 314.424 296.2H289.424V339.6C289.424 345.067 290.358 349.333 292.224 352.4C294.224 355.467 297.624 357 302.424 357H316.224C317.558 357 318.691 357.467 319.624 358.4C320.558 359.333 321.024 360.467 321.024 361.8V374.2C321.024 375.533 320.558 376.667 319.624 377.6C318.691 378.533 317.558 379 316.224 379H300.024Z",
  "M343.566 379C342.233 379 341.1 378.533 340.166 377.6C339.233 376.667 338.766 375.533 338.766 374.2V279.8C338.766 278.467 339.233 277.333 340.166 276.4C341.1 275.467 342.233 275 343.566 275H360.166C361.633 275 362.766 275.467 363.566 276.4C364.5 277.333 364.966 278.467 364.966 279.8V374.2C364.966 375.533 364.5 376.667 363.566 377.6C362.766 378.533 361.633 379 360.166 379H343.566ZM342.766 257.8C341.433 257.8 340.3 257.333 339.366 256.4C338.433 255.467 337.966 254.333 337.966 253V238.6C337.966 237.267 338.433 236.133 339.366 235.2C340.3 234.267 341.433 233.8 342.766 233.8H360.966C362.433 233.8 363.633 234.267 364.566 235.2C365.5 236.133 365.966 237.267 365.966 238.6V253C365.966 254.333 365.5 255.467 364.566 256.4C363.633 257.333 362.433 257.8 360.966 257.8H342.766Z",
  "M428.301 379C426.167 379 424.567 378.533 423.501 377.6C422.567 376.533 421.767 375.333 421.101 374L383.701 281.2C383.434 280.533 383.301 279.933 383.301 279.4C383.301 278.2 383.701 277.2 384.501 276.4C385.434 275.467 386.501 275 387.701 275H403.901C405.501 275 406.701 275.467 407.501 276.4C408.301 277.2 408.834 278 409.101 278.8L435.701 349L462.301 278.8C462.567 278 463.101 277.2 463.901 276.4C464.701 275.467 465.901 275 467.501 275H483.901C484.967 275 485.901 275.467 486.701 276.4C487.634 277.2 488.101 278.2 488.101 279.4C488.101 279.933 488.034 280.533 487.901 281.2L450.301 374C449.767 375.333 448.967 376.533 447.901 377.6C446.834 378.533 445.234 379 443.101 379H428.301Z",
  "M547.434 381C532.634 381 520.9 376.733 512.234 368.2C503.567 359.667 498.9 347.533 498.234 331.8C498.1 330.467 498.034 328.8 498.034 326.8C498.034 324.667 498.1 323 498.234 321.8C498.767 311.667 501.034 303 505.034 295.8C509.167 288.467 514.834 282.867 522.034 279C529.234 275 537.7 273 547.434 273C558.234 273 567.3 275.267 574.634 279.8C581.967 284.2 587.5 290.4 591.234 298.4C594.967 306.267 596.834 315.4 596.834 325.8V330C596.834 331.333 596.367 332.467 595.434 333.4C594.5 334.333 593.3 334.8 591.834 334.8H525.434C525.434 334.8 525.434 335 525.434 335.4C525.434 335.8 525.434 336.133 525.434 336.4C525.567 341.067 526.434 345.4 528.034 349.4C529.767 353.267 532.234 356.4 535.434 358.8C538.767 361.2 542.7 362.4 547.234 362.4C550.967 362.4 554.1 361.867 556.634 360.8C559.167 359.6 561.234 358.267 562.834 356.8C564.434 355.333 565.567 354.133 566.234 353.2C567.434 351.6 568.367 350.667 569.034 350.4C569.834 350 570.967 349.8 572.434 349.8H589.634C590.967 349.8 592.034 350.2 592.834 351C593.767 351.8 594.167 352.8 594.034 354C593.9 356.133 592.767 358.733 590.634 361.8C588.634 364.867 585.7 367.867 581.834 370.8C577.967 373.733 573.1 376.2 567.234 378.2C561.5 380.067 554.9 381 547.434 381ZM525.434 318H569.634V317.4C569.634 312.2 568.767 307.667 567.034 303.8C565.3 299.8 562.767 296.733 559.434 294.6C556.1 292.333 552.1 291.2 547.434 291.2C542.767 291.2 538.767 292.333 535.434 294.6C532.1 296.733 529.567 299.8 527.834 303.8C526.234 307.667 525.434 312.2 525.434 317.4V318Z"
]
const styles = StyleSheet.create({
  layer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

const StrokeAnimation: FC = () => {
  return (
    <View style={styles.layer}>
      <Svg
        width={width}
        height={height}
        viewBox={[
          -MARGIN / 2,
          -MARGIN / 2,
          vWidth + MARGIN / 2,
          vHeight + MARGIN / 2
        ].join(" ")}
      >
        {paths.map((d, key) => (
          <AnimatedStroke d={d} key={key} />
        ))}
      </Svg>
    </View>
  )
}

export default StrokeAnimation
