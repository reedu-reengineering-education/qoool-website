"use client"

import IframeResizer from "@iframe-resizer/react"

export default function LearnModulesQuizPage() {
  return (
    <div className="rounded bg-white overflow-hidden">
      <IframeResizer
        log="collapsed"
        src="https://reedu-reengineering-education.github.io/qoool-nv-quiz/NV_To_Go.html"
        style={{ width: "100%", height: "100vh" }}
        license={"GPLv3"}
        allowFullScreen
        allow="fullscreen; geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor"
      />
    </div>
  )
}
