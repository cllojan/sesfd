import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState,useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
const ModalContainer = styled.article`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(23, 32, 42,.5);
  z-index: 1000;
`;
const ModalContentContainer = styled.div`
  background-color: white;
  position: relative;
  width: auto;
  border-radius: 8px;
  
  box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;
const ModalBodyContainer = styled.div`
  padding: 1rem 1rem;
`;
const ModalTitle = styled.h2`
  font-weight: bold;
  padding: 0 1rem;
  color:#374151;
  align-self: flex-start;
`;
const Label = styled.label`
  
  font-family:"Inter";
  font-size:14px;
  font-weight:500;
    align-self: flex-start;
  color:#374151;
`
const HorizontalDivider = styled.div`
    margin:0 15px;
  width: 95%;
  height: 2px;
  background-color: ${(props) =>
        props.backgroundColor || "rgba(0, 0, 0, 0.18)"};
`;
const Input = styled.input`  
  height:15px;
  font-family:"Inter";
  font-size:14px;
  font-weight:500;
  padding:10px;
  margin-bottom: 5px;
  border: 1px solid rgb(229 231 235/1);  
  border-radius:5px;    
    &:focus{
        outline:none;
        box-shadow: 0 0 0 1.6px #007bff;
        border-radius:5px;
    }
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
     
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  gap: ${(props) => props.gap || 0};
`;
const Button = styled.button`
    width:100%;
    height:40px;
    font-family:"Inter";
    font-weight:500;
    border-radius:5px;
    color:#fff;
    background-color: ${(props) => props.backgroundColor || "white"};
    cursor:pointer;
    border:none;
`;
const FormBox = styled.div`
    display: grid;
    grid-template-columns:1fr 1fr;
    gap: 20px;
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap:10px;
`
const Select = styled.select`
  
  font-family:"Inter";
  font-size:14px;
  font-weight:500;
  padding:8px;
  margin-bottom: 5px;
  border: 1px solid rgb(229 231 235/1);  
  border-radius:5px;  
  cursor:pointer;
    &:focus{
        outline:none;
        box-shadow: 0 0 0 1.6px #007bff;
        border-radius:5px;
    }
    &::-ms-expand {
        display: none; /* Para ocultar la flecha en IE 10 y versiones anteriores */
    }
    & option:nth-child(1) {
      margin-top:20px;
      
      color: #333;
    }
`;
const Modal = ({ handleDisplayModal, data }) => {
    const { session, update } = useSession();

    const [name, setName] = useState(data?.user.name);
    const [lastname, setLastname] = useState(data?.user.lastname);
    const [email, setEmail] = useState(data?.user.email);
    const [cellphone, setCellphone] = useState(data?.user.cellphone);
    const [parish, setparish] = useState(data?.user.parish);
    const [canton, setPanton] = useState(data?.user.canton);
    const [province, setPovince] = useState(data?.user.province);
    const [streetAddress, setstreetAddress] = useState(data?.user.streetAddress);

    const [provincias, setProvincias] = useState([]);
    const [cantones, setCantones] = useState([]);
    const [parroquias, setParroquias] = useState([]);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('1'); 
    const [cantonSeleccionada, setCantonSeleccionada] = useState('101'); 
    const [parroquiaSeleccionada, setParroquiaSeleccionada] =useState("10101");

    const router = useRouter()

    useEffect(() => {
        // Realizar la solicitud a la API
        fetch('https://gist.githubusercontent.com/emamut/6626d3dff58598b624a1/raw/166183f4520c4603987c55498df8d2983703c316/provincias.json')
          .then(response => response.json())
          .then(data => {
            // Actualizar el estado con los datos de las provincias
            setProvincias(data);
            setCantones(data[provinciaSeleccionada].cantones);                
            setParroquias(data[provinciaSeleccionada].cantones[cantonSeleccionada].parroquias)
          })
          .catch(error => {
            console.error('Error al obtener datos:', error);
          });
      }, []);
    
    
      const handleProvinciaChange = (event) => {    
        const provinciaSelec = event.target.value;    
        const cantonesDeProvincia = provincias[provinciaSelec]?.cantones || [];       
        
        setCantones(cantonesDeProvincia);  
        setProvinciaSeleccionada(provinciaSelec);
        let cantonSelecc = String(Object.keys(provincias[provinciaSelec].cantones)[0])
        setCantonSeleccionada(cantonSelecc)
        let parroquiasSle = provincias[provinciaSelec]?.cantones[cantonSelecc].parroquias || []
        setParroquias(parroquiasSle);
        setParroquiaSeleccionada(String(Object.keys(parroquiasSle)[0]))
        
      };
      const handleCantonChange = (event) => {    
        
        const cantonSeleccionada = event.target.value;    
        const parroquias = provincias[provinciaSeleccionada]?.cantones[cantonSeleccionada].parroquias || []
        
        setParroquias(parroquias);  
        setParroquiaSeleccionada(String(Object.keys(parroquias)[0]))
        setCantonSeleccionada(cantonSeleccionada);
      };
    
      const handleParroquiaChange = (event) => {
        setParroquiaSeleccionada(event.target.value)
      }


    async function handleSubmit(event) {

        event.preventDefault()    
        let id  = data?.user._id    
        let provincia = provincias[provinciaSeleccionada].provincia
        let canton = provincias[provinciaSeleccionada].cantones[cantonSeleccionada].canton
        let parroquia = provincias[provinciaSeleccionada].cantones[cantonSeleccionada].parroquias[parroquiaSeleccionada]
        try {
            const response = await axios.put('/api/auth/signup', {
                _id: id,name,lastname, email, cellphone,parish:parroquia,canton,streetAddress,province:provincia,
            });            
            const rpo = await update({
                ...data,
                user:{
                    ...data?.user,
                    name,
                    lastname,
                    email,
                    cellphone,
                    parish:parroquia,canton,streetAddress,province:provincia
                }
            })
            console.log(rpo)
            if (response.statusText == "OK") return router.push("/dashboard/profile")            
        } catch (e) {
            console.log(e)
        }

    }
    
    return (
        <ModalContainer >
            <ModalContentContainer>
                <AiOutlineCloseCircle
                    className="close-icon"
                    onClick={handleDisplayModal}
                />
                <ModalTitle>Actualizar Informacion</ModalTitle>
                <HorizontalDivider backgroundColor="#007bFF" />
                <ModalBodyContainer>
                    <Form justifyContent="flex-start" alignItems="stretch" gap="8px">

                        <FormBox>
                            <Box>
                                <Label>Nombre</Label>
                                <Input 
                                    value={name}
                                    onChange={ev => setName(ev.target.value)} />
                            </Box>
                            <Box>
                                <Label>Apellido</Label>
                                <Input 
                                    value={lastname}
                                    onChange={ev => setLastname(ev.target.value)} />
                            </Box>
                        </FormBox>
                        <Label>Correo Electronico</Label>
                        <Input 
                            type="email"
                            value={email} 
                            onChange={ev => setEmail(ev.target.value)} />
                        <Label>Celular</Label>
                        <Input 
                            type="number"
                            value={cellphone}
                            onChange={e => setCellphone( e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10))}/>
                        <FormBox>
                            <Box>
                                <Label>Provincia</Label>
                                <Select type="text"
                                    onChange={handleProvinciaChange}
                                    
                                >
                                    {
                                    Object.entries(provincias).map((elm, inx) => (
                                        <option key={elm[0]} value={elm[0]}>{provincias[elm[0]].provincia}</option>
                                    ))
                                    }
                                </Select>
                            </Box>
                            <Box>
                                <Label>Canton</Label>
                                <Select type="text"
                                    onChange={handleCantonChange}
                                    
                                >
                                    {
                                    Object.entries(cantones)?.map((canton) => (
                                        <option key={canton[0]} value={canton[0]}>
                                        {cantones[canton[0]].canton}
                                        </option>
                                    ))
                                    }
                                </Select>
                            </Box>
                        </FormBox>
                        <Label>Parroquia</Label>
                        <Select type="text"                                        
                        onChange={handleParroquiaChange}
                        >
                            {
                            Object.entries(parroquias).map((parroquia) => (
                                <option key={parroquia[0]} value={parroquia[0]}>
                                {parroquias[parroquia[0]]}
                                </option>
                            ))
                            }
                        </Select>
                        <Label>Direccion</Label>
                        <Input type="text" 
                        value={streetAddress}
                        name="direccion"
                        onChange={ev => setstreetAddress(ev.target.value)}  />
                        
                        <FormBox>
                            <Button backgroundColor="#007bFF" color="white" onClick={e => handleSubmit(e)}>
                                Actualizar
                            </Button>
                            <Button backgroundColor="#E74C3C " onClick={handleDisplayModal}>
                                Cancelar
                            </Button>
                        </FormBox>
                            
                    </Form>
                </ModalBodyContainer>
            </ModalContentContainer>
        </ModalContainer>
    );
};
export default Modal;