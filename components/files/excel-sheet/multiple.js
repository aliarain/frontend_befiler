import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {capitalizeFirstLetter} from "../../common/utilities";


export const multiExportExcelFormatDynamic = ({excelData, title, extraData}) => {

    const formattedData = excelData?.map((data, i) => {
        const keys = Object?.keys(data)
        const values = Object?.values(data)

        return {
            category: `${data?.name} ${i + 1}`,
            data: keys?.map((d, i) => ({
                "Input Field": `${capitalizeFirstLetter(d?.split("_").join(" "))}`,
                "Input Value": `${values[i] ?? ""}`,
            }))
        }
    })

    multiExportDataToFile({title, formattedData, rowData: excelData})
}

export const multiExportExcelFormat = ({excelData, title, extraData}) => {
    const formattedData = excelData?.map((data, i) => {
        return {
            category: `${data?.name} ${i + 1}`,
            data: [
                {
                    A: "Username",
                    B: `${excelData?.user?.username ?? ""}`,
                    C: "Partner sin",
                    D: `${excelData?.partner_sin ?? ""}`,
                },

                {A: "Rental Information"},

                {
                    A: "Address",
                    B: `${excelData?.address ?? ""}`,
                },

                {A: "Educational Information"},

                {
                    A: "Name of College",
                    B: `${excelData?.institution_name ?? ""}`,
                },
                {
                    A: "Link to the attached T2202A forms",
                    B: ``,
                },
                {
                    A: "Payment Status",
                    B: `${excelData?.stripe_payment ? "succeeded" : 'Pending'}`,
                },
                {
                    A: "Coupon Code Used",
                    B: `${excelData?.coupon_code_user ?? ""}`,
                },
                {
                    A: "Student ID",
                    B: `${excelData?.profile_image ?? ""}`,
                },

                {A: ""},

                {
                    A: "T4",
                    B: `${excelData?.t4s ?? ""}`,
                },
                {
                    A: "Link to the attached T4 forms",
                    B: ``,
                },
            ]
        }
    })

    multiExportDataToFile({title, formattedData, rowData: excelData})
}

export const multiExportDataToFile = ({title, formattedData, rowData}) => {
    const fileType = "xlsx"
    const product1 = XLSX.utils.json_to_sheet(rowData);
    let wb1 = {Sheets: {data: product1}, SheetNames: ["data"]};
    product1["!cols"] = [
        {width: 28},
        {width: 8},
        {width: 12},
        {width: 12},
        {width: 12}
    ];

    formattedData.map((item, index) => {
        var wscols = [
            {width: 35},
            {width: 50},
            {width: 30},
            {width: 30},
        ];
        item['json'] = XLSX.utils.json_to_sheet(item.data);
        item.json["!cols"] = wscols;
    })

    let obj = {
        Sheets: {},
        SheetNames: []
    }

    obj = wb1;

    formattedData.map((item, key) => {
        return (obj.Sheets[item.category] = item.json,
            obj.SheetNames.push(item.category))
    })

    const test = {...obj}
    const excelBuffer = XLSX.write(test, {bookType: "xlsx", type: "array"});
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, `${title ? title : "tax-files"}` + ".xlsx")
}
