import { FaPencil } from "react-icons/fa6";
import NavMenu from "../components/NavMenu";
import WideLayout from "../components/WideLayout";


export default function Editor() {
  return (
    <WideLayout>
        <div className="editor">
            <div className="editor--header">
                <NavMenu />

                <span className="editor--header__name-ctn">
                    <span className="editor--header__blok-name">
                        New_Blok
                    </span>

                    <button className="editor--header__rename-btn">
                        <FaPencil/>
                    </button>
                </span>

                <div className="editor--header__actions-ctn">
                    
                </div>
            </div>
        </div>
    </WideLayout>
  )
}
