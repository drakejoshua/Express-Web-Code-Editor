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
            bg-gray-100 dark:bg-gray-800
            rounded-md
            ${ className || ""}
        `}
    >
        <FaFileCode 
            className='
                preview__icon
                text-2xl
                text-gray-500 dark:text-gray-400
            ' 
        />

        <span className="preview__text">
            Blank Template
        </span>
    </div>
  )
}
