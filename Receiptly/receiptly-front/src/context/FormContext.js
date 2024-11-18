import { createContext , useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({children}) => {
    const [Data, setData] = useState({})
    const [Step, setStep] = useState(0)

    const updateData = (data) => {
        setData(prev => ({...prev , ...data}))
    }

    const goToStep = (step) => setStep(step)

    return(
        <FormContext.Provider value={{Data , Step, updateData, goToStep}}>
            {children}
        </FormContext.Provider>
    )
}

export const useFormContext = () => useContext(FormContext);