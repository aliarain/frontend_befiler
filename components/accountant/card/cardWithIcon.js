import React, { useEffect } from 'react';
import { getAllTaxFilesUserwiseAPI } from '../../../helpers/backend_helper';
import { useFetch } from '../../../helpers/hooks';
import { SiTaxbuzz } from 'react-icons/si';
import { AiOutlineFileDone } from 'react-icons/ai';
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import moment from 'moment';


const CardWithIcon = () => {
    const [taxData, setTaxData, { loading, error }] = useFetch(getAllTaxFilesUserwiseAPI);

    useEffect(() => {
        const data = {}
        setTaxData(data)
    }, []);

    // complete file count
    const completeFile = taxData?.docs?.filter(file => file?.taxfile_status === "completed");

    // recent added tax file count
    const recentAddedFile = taxData?.docs?.filter(file => moment(file?.updatedAt).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'));

    const cardsData = [
        { tittle: 'Total Assigned Tax Files', number: `${taxData?.docs?.length ?? 0}`, bgColors: 'bg-red-700', icon: SiTaxbuzz },
        { tittle: 'Complete File', number: `${completeFile?.length ?? 0}`, bgColors: 'bg-green-700', icon: AiOutlineFileDone },
        { tittle: 'Recently Assigned File', number: `${recentAddedFile?.length ?? 0}`, bgColors: 'bg-blue-700', icon: MdOutlineAssignmentTurnedIn },
    ]

    
    return (
        <div>
            <div className='lg:grid lg:grid-cols-3 gap-[1%] my-[5%]'>
                {
                    cardsData.map((d, i) => 
                        <div key={i+1} className='bg-white p-3 rounded shadow-lg mt-10 lg:mt-0'>
                            <div className='grid grid-cols-2'>
                                <div className='relative'>
                                    <div className={`absolute -top-10 border h-20 w-20 shadow ${d?.bgColors} flex justify-center items-center rounded`}>
                                        <d.icon className='text-4xl text-white' />
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-[#555050] text-[16px] mb-0'>{d?.tittle}</p>
                                    <p className='text-xl font-bold text-gray-700'>{d?.number}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default CardWithIcon;