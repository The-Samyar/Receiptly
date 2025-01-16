import Navbar from '../Components/Navbar/Navbar'
import SignIn from '../Components/Sign/SignIn/SignIn'
import SignUp from '../Components/Sign/SignUp/SignUp'
export const SignUpIn = ({ login }) => {
    return (
        <>
            <Navbar></Navbar>
            <section className="Body">
                {
                    login ? <SignIn /> : <SignUp />
                }
            </section>
        </>
    )
}
