declare module "h5p-standalone" {
  export interface H5POptions {
    h5pJsonPath: string
    frameJs: string
    frameCss: string
    id?: string
    librariesPath?: string
    contentJsonPath?: string
    frame?: boolean
    copyright?: boolean
    export?: boolean
    icon?: boolean
    downloadUrl?: string
    fullScreen?: boolean
    embed?: boolean
    embedCode?: string
    customCss?: string | string[]
    customJs?: string | string[]
    reportingIsEnabled?: boolean
    xAPIObjectIRI?: string
  }

  export class H5P {
    constructor(element: HTMLElement, options: H5POptions)
    then(onFulfilled: () => void): Promise<void>
  }
}
