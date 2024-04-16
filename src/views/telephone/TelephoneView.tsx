import { Box, Button } from "@mui/material";
import HeaderPreachs from "../../components/preachs/HeaderPreachs";
import UserCard from "../../components/user/UserCard";
import ListPreachs from "../../components/preachs/ListPreachs";
import apiConnector from "../../services/api.service";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TelephoneView = () => {
  const [list, setList] = useState<any[]>([]);
  const [newListButton, setNewListButton] = useState(true);

  const congregationId = 1;

  const negative = async (id: any) => {
    const item = list.find((i) => i.id === id);
    item.status = "noHome";
    try {
      await apiConnector.put(`/phone/congregation/${congregationId}/${id}`, { result: 'NO_ATENDIO' });
      setList([...list]);
      checkAllItemsUpdated();
      toast.success('Registro guardado con éxito', {autoClose:2000});
    } catch (error) {
      console.error(error);
      toast.error('Error al guardar el registro', {autoClose:2000});
    }
  }

  const positive = async (id: any) => {
    const item = list.find((i) => i.id === id);
    item.status = "success";
    try {
      await apiConnector.put(`/phone/congregation/${congregationId}/${id}`, { result: 'ATENDIO' });
      setList([...list]);
      checkAllItemsUpdated();
      toast.success('Registro guardado con éxito', {autoClose:2000});
    } catch (error) {
      console.error(error);
      toast.error('Error al guardar el registro', {autoClose:2000});
    }
  }

  const checkAllItemsUpdated = () => {
    const allItemsUpdated = list.every(item => item.status === 'noHome' || item.status === 'success');
    setNewListButton(!allItemsUpdated);
  };

  const get = useCallback(async (congregationId: number) => {
    try {
      const response: { data: any[] } = await apiConnector.get(`/phone/congregation/${congregationId}`);
      console.log(response)
      const result = response.data
      setList(result.map((phone) => ({ id: phone.id, name: phone.phones })));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => { get(congregationId) }, []);

  return (<>
    <HeaderPreachs type='telephone' />
    <ToastContainer />
    <Box sx={{ mx: '16px', position: 'relative', top: -22 }}>
      <UserCard color='telephone' />
      <ListPreachs
        title='Lista de telefónica aleatoria'
        color='telephone'
        items={list}
        possitiveAction={positive}
        negativeAction={negative}
      />
       <Box>
        <Button sx={{ borderRadius: 1, py: 1 }}
          variant="contained"
          fullWidth
          onClick={() => get(congregationId)}
          disabled={newListButton}
        >Siguiente lista telefónica</Button>
      </Box>
    </Box>
  </>);
}

export default TelephoneView;