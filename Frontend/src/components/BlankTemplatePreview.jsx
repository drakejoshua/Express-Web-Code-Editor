// BlankTemplatePreview.jsx
// A preview component for a blank template option in the template selection interface
// of the create route



// import component dependencies
import { FaFileCode } from 'react-icons/fa6'


// define and export BlankTemplatePreview component
export default function BlankTemplatePreview({ className }) {
  return (
    <div 
        // apply custom and default styles
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
