"use client"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import IframeResizer from "@iframe-resizer/react"
import { Download, InfoIcon } from "lucide-react"
import Link from "next/link"

export default function LearnModulesQuizPage() {
  return (
    <div className="grid gap-6">
      <Alert>
        <InfoIcon className="pr-2" />
        <AlertTitle className="font-normal leading-normal">
          Please note: All provided learning and experimental materials
          (quizzes, guides, and worksheets) are currently only available in
          German.
        </AlertTitle>
      </Alert>

      <h3 className="font-semibold">
        In this area, interactive learning and experimental materials on the
        topic of Quantum Sensing are provided. The offerings range from quiz
        formats and experiment instructions to digital learning modules: a place
        to discover, explore, and understand quantum phenomena.
      </h3>
      <div className="rounded bg-white overflow-hidden text-black">
        <div className="p-4">
          <h4 className="font-semibold">Understanding NV-Centers</h4>
          <p>
            What happens inside a diamond when a vacancy is created? This
            interactive quiz introduces the fundamentals of NV-centers step by
            step and clearly conveys how tiny lattice defects in diamonds become
            the foundation for quantum sensors.
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
      <div className="grid gap-1">
        <h4 className="font-semibold">Experiment Guide: QOOOL Kit Fluoro</h4>
        <p>
          With the senseBox and the QOOOL Kit Fluoro, the phenomenon of
          fluorescence can be practically explored. The guide provides
          background knowledge, setup instructions, and simple evaluation
          methods for schools, student labs, and training: ideal for visualizing
          the physical fundamentals of light emission.
        </p>
        <Link
          href={
            "/QOOOL-Kit-Fluoro_Experimentieranleitung_Hintergrundwissen.pdf"
          }
        >
          <Button className="w-fit">
            <Download className="h-4 mr-2" />
            Experiment Guide
          </Button>
        </Link>
      </div>
      <div className="grid gap-1">
        <h4 className="font-semibold">
          Worksheet: The Quantum Mechanical Potential Well
        </h4>
        <p>
          These freely available documents contain flexible, modular material
          for a lesson sequence on the potential well. This includes
          cost-effective experiments for teachers and students (approx. 40 Euros
          one-time cost), explanatory texts, diagrams, practice exercises, and
          sample solutions. Everything is tested and freely accessible. The
          curriculum topic is based on quantum-mechanically colored salts, whose
          robust and distinct color can even be quantitatively explained to
          students using the potential well model.
        </p>
        <Link href={"/AB_Potentialtopf_Simon_v3.pdf"}>
          <Button className="w-fit">
            <Download className="h-4 mr-2" />
            Potential Well Worksheet
          </Button>
        </Link>
        <div className="h-1" />
        <Link href={"/Potentialtopf_Experimentieranleitung.pdf"}>
          <Button className="w-fit">
            <Download className="h-4 mr-2" />
            Potential Well Experiment Guide
          </Button>
        </Link>
      </div>
    </div>
  )
}
