"use client"

import { Button } from "@/components/ui/button"
import H5PPlayer from "@/components/pages/quantum-interactive/h5p-player"
import { h5pElements } from "@/components/pages/quantum-interactive/h5p-elements"
import H4 from "@/components/ui/typography/H4"
import P from "@/components/ui/typography/P"
import IframeResizer from "@iframe-resizer/react"
import { Download } from "lucide-react"
import Link from "next/link"

const h5pLabels = {
  start: "Kurs starten",
  loading: "Kurs wird geladen …",
  error: "Dieser Inhalt konnte nicht geladen werden. Bitte lade die Seite neu.",
}

export default function LernmaterialienPage() {
  return (
    <div>
      <P>
        In diesem Bereich werden interaktive Lern- und Experimentiermaterialien
        zum Thema Quantensensorik bereitgestellt. Die Angebote reichen von
        Quizformaten über Versuchsanleitungen bis hin zu digitalen Lernmodulen:
        ein Ort zum Entdecken, Erforschen und Verstehen von Quantenphänomenen
      </P>
      <div className="grid gap-12 pt-8">
        <div className="rounded bg-white overflow-hidden text-black">
          <div className="p-4">
            <h4 className="font-semibold">NV-Zentren verstehen</h4>
            <p>
              Was passiert im Inneren eines Diamanten, wenn eine Leerstelle
              entstehen? Das interaktive Quiz führt Schritt für Schritt in die
              Grundlagen der NV-Zentren ein und vermittelt auf anschauliche
              Weise, wie aus winzigen Gitterfehlern in Diamanten die Grundlage
              für Quantensensoren entsteht.
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
          <H4>Experimentieranleitung: QOOOL Kit Fluoro</H4>
          <P>
            Mit der senseBox und dem QOOOL Kit Fluoro lässt sich das Phänomen
            der Fluoreszenz praktisch erforschen. Die Anleitung bietet
            Hintergrundwissen, Aufbauhinweise und einfache Auswertungen für
            Schule, Schülerlabor und Ausbildung: ideal, um die physikalischen
            Grundlagen der Lichtemission sichtbar zu machen.
          </P>
          <Link
            href={
              "/QOOOL-Kit-Fluoro_Experimentieranleitung_Hintergrundwissen.pdf"
            }
          >
            <Button className="w-fit" size={"sm"}>
              <Download className="h-4 mr-2" />
              Experimentieranleitung
            </Button>
          </Link>
        </div>
        <div className="grid gap-2">
          <H4>Arbeitsblatt: Der quantenmechanische Potentialtopf</H4>
          <P>
            In diesen frei verfügbaren Dokumenten liegt flexibel
            zusammenstellbares Material für einen Unterrichtsgang zum
            Potentialtopf bereit. Von kostengünstigen Lehrer- und
            SuS-Experimenten (einmalig ca. 40 Euro), über Erklärtexte,
            Abbildungen, Übungsaufgaben und Musterlösungen. Alles ist erprobt
            und frei zugänglich. Inhaltlich ist das Lehrplanthema an
            quantenmechanisch gefärbten Salzen aufgezogen, deren robuste und
            deutliche Farbe ist mit dem Model des Potentialtopfes sogar
            quantitativ für SuS erreichbar.
          </P>
          <div className="grid gap-4">
            <Link href={"/AB_Potentialtopf_Simon_v3.pdf"}>
              <Button className="w-fit" size={"sm"}>
                <Download className="h-4 mr-2" />
                Arbeitsblatt Potentialtopf
              </Button>
            </Link>
            <Link href={"/Potentialtopf_Experimentieranleitung.pdf"}>
              <Button className="w-fit" size={"sm"}>
                <Download className="h-4 mr-2" />
                Experimentieranleitung Potentialtopf
              </Button>
            </Link>
          </div>
        </div>
        {h5pElements.map((element) => (
          <div
            key={element.h5pJsonPath}
            className="rounded bg-white overflow-hidden text-black"
          >
            <div className="p-4">
              <h4 className="font-semibold">{element.title}</h4>
            </div>
            <H5PPlayer
              h5pJsonPath={element.h5pJsonPath}
              title={element.title}
              labels={h5pLabels}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
