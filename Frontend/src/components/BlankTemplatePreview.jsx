import { FaFileCode } from 'react-icons/fa6'

export default function BlankTemplatePreview({ className }) {
  return (
    <div 
        className={`
            preview
            h-52
            flex
            flex-col
            justify-center
            items-center
            gap-2
            bg-gray-300 dark:bg-gray-800
            rounded-md
            ${ className || ""}

            *:text-gray-500 dark:*:text-gray-400
        `}
    >
        <FaFileCode 
            className='
                preview__icon
                text-2xl
            ' 
        />

        <span className="preview__text">
            Blank Template
        </span>
    </div>
  )
}
