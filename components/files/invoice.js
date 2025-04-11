import {capitalizeFirstLetter} from "../common/utilities";
import {reportExportToExcel} from "../../helpers/excel";
import moment from "moment/moment";
import React from "react";


export const InvoiceDetails = ({invoice = {}, getSiteData = {}}) => {
    const image = invoice?.profile_image
    const name = capitalizeFirstLetter(invoice?.first_name ?? '') + " " + capitalizeFirstLetter(invoice?.middle_name ?? '') + " " + capitalizeFirstLetter(invoice?.last_name ?? '')

    delete invoice?.profile_image
    delete invoice?.first_name
    delete invoice?.middle_name
    delete invoice?.last_name

    const keys = Object?.keys(invoice)
    const values = Object?.values(invoice)

    return (
        <>
            <div id="print-content" className="hidden">
                <div style={{padding: '20px', overflow: "hidden"}}>
                    <div className={'company hero_font_family'}>
                        <div>
                            <p>Company: {getSiteData?.username}</p>
                            <p>Contact Number: {getSiteData?.contact_number}</p>
                            <p>Contact Email: {getSiteData?.contact_email}</p>
                            <p>Website: {getSiteData?.website}</p>
                            <p>Office Address: <span style={{textAlign: 'justify'}}>{getSiteData?.office_address}</span>
                            </p>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <img src={getSiteData?.logo} alt="logo"
                                 style={{height: '150px', width: '200px', objectFit: 'contain'}}
                            />
                        </div>
                    </div>

                    <div style={{textAlign: 'center', marginBottom: '5px'}}>
                        {
                            !!image &&
                            <img src={image} alt="logo"
                                 style={{
                                     height: '150px',
                                     width: '150px',
                                     objectFit: 'cover',
                                     objectPosition: 'center'
                                 }}
                            />
                        }
                    </div>

                    <p style={{marginLeft: '30px'}}>Name: {name} </p>

                    <div className={'contents'}>
                        {
                            keys?.map((d, i) => <div key={i}>
                                <span style={{color: "purple"}}>
                                    {capitalizeFirstLetter(d?.split("_").join(' '))} :
                                </span>
                                <span style={{paddingLeft: '5px'}}>{typeof values[i] === "boolean" ? values[i] === true ? "yes" : "no"  : values[i] }</span>
                            </div>)
                        }
                    </div>
                </div>
            </div>

            <iframe id="print-frame" className="hidden">
            </iframe>
        </>
    )
}

export const handleInvoicePrint = () => {
    let body = document.querySelector('#print-content').innerHTML;
    let frame = window.frames['print-frame'].contentWindow
    frame.document.head.innerHTML = `
        <style>    
        table, th, td {
            font-size: 12px;
            border-collapse: collapse;
            min-width: 60px;
            text-align: left;
            padding: 10px 0;
        }
        table {
            width: 100%;
            padding: 5px;
        }
        table table {
            border: none;
        }
        th {
            padding: 5px;
        }
        td {
            padding: 5px;
        }
        .hide-report {
            display: none;
        }
        .print-btn {
            display: none;
        }
        p {
            margin: 0;
        }
        hr {
          margin: 0;
          padding: 0;
          border: 1px solid #fff;
          height:3px;
        }
        hr:after {
            position: absolute;
            content:"..................................................";
            letter-spacing: 3px;
            color: rgba(0,0,0, .25);
             margin-top: -10px;
             font-size: 12px;
             width: 100%;
          
             overflow: hidden;
        }
        body { margin: 1.6cm; position: relative }
        @media print {
            @page { margin: 0}
            body { margin: 15px }
        }
        .text-xs {
            font-size: 11px;
        }
        .text-sm {
            font-size: 12px;
        }
        .text-center {
            text-align: center;
        }
        .text-bold {
            font-weight: 700;
        }
        
        .mb-2 {
            margin-bottom: 4px;
        }
        
        * {
            -webkit-print-color-adjust: exact !important;   /* Chrome, Safari, Edge */
            color-adjust: exact !important;                 /*Firefox*/
        }
        .company {
            display: flex; 
            justify-content: space-evenly; 
            align-items: center; 
            background-color: red; 
            color: white; 
            font-size: medium; 
            font-weight: 600;
            line-height: 1.3;
            margin-bottom: 25px;
        }
        .contents {
            display: grid;
            grid-template-columns: 1fr 1fr;
            line-height: 1.4;
            font-size: 16px;
            margin: 10px 30px 0 30px ;
        }
        </style>
        `
    frame.document.body.innerHTML = body
    window.setTimeout(() => {
        frame.print();
    }, 300)
}


export const handleExportExcel = (data, obj, getSiteData, information) => {
    const keys = Object?.keys(obj)
    const values = Object?.values(obj)

    let ExcelColumn = keys?.map((dt, i) => ({
        dataField: `${dt}`,
        text: `${capitalizeFirstLetter(dt?.split('_').join(' '))}`,
        formatter: (dt) => (<span className={`whitespace-pre capitalize`}>{dt}</span>),
    }))

    const name = capitalizeFirstLetter(obj?.first_name ?? '') + " " + capitalizeFirstLetter(obj?.middle_name ?? '') + " " + capitalizeFirstLetter(obj?.last_name ?? '')

    reportExportToExcel({
        fileName: capitalizeFirstLetter(getSiteData?.username ?? ''),
        sheetName: name ?? '',
        data: data?.map((d, index) => ({
            index: index + 1,
            ...d
        })) || [],
        headers: [
            {
                name: 'No',
                key: 'index',
                width: 25,
            },
            ...ExcelColumn?.map(c => ({
                name: c.text,
                key: c.dataField,
                width: 25,
            })),
        ],
        title: `Name: ${name ?? ''}`,
        descriptions: [...[`Date: ${moment().format('ll')}`, `Payment Status: ${capitalizeFirstLetter(information?.payment ?? '')}`]],
    })
}