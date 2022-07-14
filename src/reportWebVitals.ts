/*
 * @Author: Pacific_D
 * @Date: 2022-04-25 22:58:45
 * @LastEditTime: 2022-07-14 10:27:36
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \react-demo\src\reportWebVitals.ts
 */
import { ReportHandler } from "web-vitals"

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import("web-vitals").then(
            ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(onPerfEntry)
                getFID(onPerfEntry)
                getFCP(onPerfEntry)
                getLCP(onPerfEntry)
                getTTFB(onPerfEntry)
            }
        )
    }
}

export default reportWebVitals
