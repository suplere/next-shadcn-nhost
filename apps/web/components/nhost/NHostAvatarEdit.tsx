"use client"
import { ChangeEvent, ForwardedRef, forwardRef, useEffect, useState } from "react"
import Image from "next/image"
import { fromImage } from "imtool"
import { Label } from "@ui/components/label"
import { Input } from "@ui/components/input"
import { Button } from "@ui/components/button"
import { deleteAvatar, uploadAvatar } from "@/app/server-actions/user"

export type AvatarEditProps = {
  value: string
  filename: string
  id: string
  bucketId?: string
  onChange: (e: string) => void
  maxSize?: number
  defaultUrl?: string
}

const DEFAULT_AVATAR_URL =
  'https://s.gravatar.com/avatar/226cd92f12774ad9ec869d138ffb26bd?r=g&default=mp'

export const NHostAvatarEdit = forwardRef(function NHostAvatarEdit(
  {
    value,
    onChange,
    filename,
    id,
    bucketId = 'default',
    maxSize = 150,
    defaultUrl = DEFAULT_AVATAR_URL,
  }: AvatarEditProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [img, setImg] = useState(value)

  // const { upload } = useFileUpload()

  const onDeleteAvatar = async () => {
    const res = await deleteAvatar(value)
    if (res) {
      setImg(defaultUrl)
    }
  }

  useEffect(() => {
    onChange(img)
  }, [img, onChange])

  const changeAvatar = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { files } = event.target
    if (files && files.length > 0) {
      await deleteAvatar(value)
      setImg(defaultUrl)
      let file = files[0]
      const lastDot = file.name.lastIndexOf('.')
      const fileName = file.name.substring(0, lastDot)
      const ext = file.name.substring(lastDot + 1)
      const tool = await fromImage(file)
      if (maxSize) {
        file = await tool.thumbnail(maxSize, false).toFile(`${fileName}.${ext}`)
      }
      const fd = new FormData()
      fd.append("file", file)
      const res = await uploadAvatar({
        id,
        bucketId,
        formData: fd,
        name: `${filename}.${ext}`
      })
      if (res.result && res.message) {
        setImg(res.message)
      }
    }
  }

  return (
    <div ref={ref}>
      <div className="mt-1 flex items-center">
        <Image
          src={img}
          unoptimized
          alt=""
          width={48}
          height={48}
          className="inline-block h-12 w-12 rounded-full border"
        />
        <div className="ml-4 flex items-center gap-2">
          <div className="border-gray-300 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50 relative flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-white dark:bg-black py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
            <Label
              htmlFor="user-photo"
              className="hidden sm:block"
              // className="text-gray-900 pointer-events-none relative text-sm font-medium"
            >
              <span>Změnit</span>
              <span className="sr-only"> user photo</span>
            </Label>
            <Input
              id="user-photo"
              name="user-photo"
              type="file"
              // className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
              onChange={changeAvatar}
            />
          </div>
          <Button
            onClick={onDeleteAvatar}
            type="button"
            // className="text-blue-gray-900 hover:text-blue-gray-700 focus:border-blue-gray-300 focus:ring-offset-blue-gray-50 ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Odstranit
          </Button>
        </div>
      </div>
    </div>
  )
})
