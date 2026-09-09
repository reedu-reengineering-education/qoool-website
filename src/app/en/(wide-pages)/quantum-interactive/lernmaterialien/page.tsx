"use client"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { moodleElements } from "@/components/pages/quantum-interactive/moodle-elements"
import H4 from "@/components/ui/typography/H4"
import P from "@/components/ui/typography/P"
import IframeResizer from "@iframe-resizer/react"
import { Download, InfoIcon } from "lucide-react"
import Link from "next/link"
import Script from "next/script"

export default function LernmaterialienPage() {
  return (
    <div>
      <Alert>
        <InfoIcon className="pr-2" />
        <AlertTitle className="font-normal leading-normal">
          Please note: All provided learning and experimental materials
          (quizzes, guides, and worksheets) are currently only available in
          German.
        </AlertTitle>
      </Alert>

      <P>
        In this area, interactive learning and experimental materials on the
        topic of Quantum Sensing are provided. The offerings range from quiz
        formats and experiment instructions to digital learning modules: a place
        to discover, explore, and understand quantum phenomena.
      </P>
      <div className="grid gap-12 pt-8">
        <div className="rounded bg-white overflow-hidden text-black">
          <div className="p-4">
            <h4 className="font-semibold">Understanding NV-Centers</h4>
            <p>
              What happens inside a diamond when a vacancy is created? This
              interactive quiz introduces the fundamentals of NV-centers step by
              step and clearly conveys how tiny lattice defects in diamonds
              become the foundation for quantum sensors.
            </p>
          </div>
          <IframeResizer
            log="collapsed"
            src="https://reedu-reengineering-education.github.io/qoool-nv-quiz/NV_To_Go.html"
            style={{ width: "100%", height: "100vh" }}
            license={"GPLv3"}
            allowFullScreen
            allow="fullscreen; geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor"
          />
        </div>
        <div className="grid gap-2">
          <H4>Experiment Guide: QOOOL Kit Fluoro</H4>
          <P>
            With the senseBox and the QOOOL Kit Fluoro, the phenomenon of
            fluorescence can be practically explored. The guide provides
            background knowledge, setup instructions, and simple evaluation
            methods for schools, student labs, and training: ideal for
            visualizing the physical fundamentals of light emission.
          </P>
          <Link
            href={
              "/QOOOL-Kit-Fluoro_Experimentieranleitung_Hintergrundwissen.pdf"
            }
          >
            <Button className="w-fit" size={"sm"}>
              <Download className="h-4 mr-2" />
              Experiment Guide
            </Button>
          </Link>
        </div>
        <div className="grid gap-2">
          <H4>Worksheet: The Quantum Mechanical Potential Well</H4>
          <P>
            These freely available documents contain flexible, modular material
            for a lesson sequence on the potential well. This includes
            cost-effective experiments for teachers and students (approx. 40
            Euros one-time cost), explanatory texts, diagrams, practice
            exercises, and sample solutions. Everything is tested and freely
            accessible. The curriculum topic is based on quantum-mechanically
            colored salts, whose robust and distinct color can even be
            quantitatively explained to students using the potential well model.
          </P>
          <div className="grid gap-4">
            <Link href={"/AB_Potentialtopf_Simon_v3.pdf"}>
              <Button className="w-fit" size={"sm"}>
                <Download className="h-4 mr-2" />
                Potential Well Worksheet
              </Button>
            </Link>
            <Link href={"/Potentialtopf_Experimentieranleitung.pdf"}>
              <Button className="w-fit" size={"sm"}>
                <Download className="h-4 mr-2" />
                Potential Well Experiment Guide
              </Button>
            </Link>
          </div>
        </div>
        {moodleElements.map((element) => (
          <div
            key={element.src}
            className="rounded bg-white overflow-hidden text-black"
          >
            <div className="p-4">
              <h4 className="font-semibold">{element.title}</h4>
            </div>
            <iframe
              src={element.src}
              title={element.title}
              className="w-full border-0"
              style={{ height: `${element.height}px` }}
              loading="lazy"
              allow="fullscreen"
              allowFullScreen
            />
          </div>
        ))}
      </div>
      <Script
        src="https://moodle.pud-edu.de/mod/hvp/library/js/h5p-resizer.js"
        charSet="UTF-8"
        strategy="afterInteractive"
      />
    </div>
  )
}
