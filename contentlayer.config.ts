// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files"

export const News = defineDocumentType(() => ({
  name: "News",
  filePathPattern: "news/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    image: { type: "string", required: true },
    language: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (news) => `/${news._raw.flattenedPath}`,
    },
  },
}))

export const Activity = defineDocumentType(() => ({
  name: "Activity",
  filePathPattern: "activities/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    image: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (activity) => `/${activity._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [News, Activity],
})
