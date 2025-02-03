/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Button } from '../components/ui/button'
import axios from 'axios'
import {
    Table,
    TableBody,

    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import { Card } from '../components/ui/card'
import { Input } from "../components/ui/input"
import { ToastContainer, toast } from 'react-toastify';
const Home = () => {


    const [data, setData] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        year: '',
        month: '',
        day: '',
        hour: ''
    })
    const fetchData = async () => {
        try {
            if (formData.name == '' || formData.year == '' || formData.month == '' || formData.day == '' || formData.hour == '') {
                toast.error('please enter all data الاسم و السنة والشهر واليوم و الساعة', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            const res = await axios.get(`/api/salary/${formData.name}/${formData.year}/${formData.month}/${formData.day}/${formData.hour}`)
            console.log(res);
            setData(res?.data)

        } catch (error: any) {
            console.log(error);

            toast.error(error?.response?.data?.message, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const handleChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }
    return (
        <div>
            <div className='flex gap-2 '>
                <Input type="text" placeholder="الاسم" className='border-black shadow-md' name='name' onChange={(e) => handleChange('name', e.target.value)} />
                <Input type="text" placeholder="السنة" className='border-black shadow-md' name='year' onChange={(e) => handleChange('year', e.target.value)} />
                <Input type="text" placeholder="الشهر" className='border-black shadow-md' name='month' onChange={(e) => handleChange('month', e.target.value)} />
                <Input type="text" placeholder="اليوم" className='border-black shadow-md' name='day' onChange={(e) => handleChange('day', e.target.value)} />
                <Input type="text" placeholder="الساعة" className='border-black shadow-md' name='hour' onChange={(e) => handleChange('hour', e.target.value)} />
                <Button onClick={() => fetchData()}>fetch</Button>

            </div>
            <ToastContainer />
            <Card className='mt-4'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >الاسم</TableHead>
                            <TableHead>السنة</TableHead>
                            <TableHead>الشهر</TableHead>
                            <TableHead >اليوم</TableHead>
                            <TableHead >الساعة</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.map((x, i) => (
                                <TableRow key={i} className='text-left'>
                                    <TableCell >{x['الاسم']}</TableCell>
                                    <TableCell>{x['السنة']}</TableCell>
                                    <TableCell>{x['الشهر']}</TableCell>
                                    <TableCell>{x['اليوم']}</TableCell>
                                    <TableCell>{x['الساعة']}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

export default Home