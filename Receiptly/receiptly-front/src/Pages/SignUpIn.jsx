import Navbar from '../Components/Navbar/Navbar'
import Sign from '../Components/Sign/Sign'
export const SignUpIn = ({ login }) => {
    return (
        <>
            <Navbar></Navbar>
            <section className="Body">
                {
                    login ? <Sign login /> : <Sign />
                }
            </section>
        </>
    )
}
