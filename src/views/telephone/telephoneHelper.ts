import { toast } from "react-toastify";
import apiConnector from "../../services/api.service";
import { useState } from "react";

export  const [list, setList] = useState<any[]>([]);
export const [newListButton, setNewListButton] = useState( true);
export const checkAllItemsUpdated = () => {
    const allItemsUpdated = list.every((item: { status: string; }) => item.status === 'noHome' || item.status === 'success');
    if (allItemsUpdated)setNewListButton(false);
  };

export const negative = async (
    list: any[],
    id: any,
    congregationId: number,
    setList: Function,
    checkAllItemsUpdated: Function) => {
    const item = list.find((i) => i.id === id);
    item.status = "noHome";
    try {
        await apiConnector.put(`/phone/congregation/${congregationId}/${id}`, { result: 'NO_ATENDIO' });
        setList([...list]);
        checkAllItemsUpdated();
        toast.success('Registro guardado con éxito', { autoClose: 2000 });
    } catch (error) {
        console.error(error);
        toast.error('Error al guardar el registro', { autoClose: 2000 });
    }
}

export const positive = async (
    list: any[],
    id: any,
    congregationId: number,
    setList: Function,
    checkAllItemsUpdated: Function) => {
       const item = list.find((i) => i.id === id);
    item.status = "success";
    try {
        await apiConnector.put(`/phone/congregation/${congregationId}/${id}`, { result: 'ATENDIO' });
        setList([...list]);
        checkAllItemsUpdated();
        toast.success('Registro guardado con éxito', { autoClose: 2000 });
    } catch (error) {
        console.error(error);
        toast.error('Error al guardar el registro', { autoClose: 2000 });
    }
}
