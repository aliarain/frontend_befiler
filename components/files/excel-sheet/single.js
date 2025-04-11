import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {capitalizeFirstLetter} from "../../common/utilities";


export const exportExcelFormatDynamic = ({excelData, title, extraData}) => {
    const data = {
        ...extraData,
        ...excelData,
    }

    const keys = Object?.keys(data)
    const values = Object?.values(data)

    const formattedData = keys?.map((d, i) => ({
        "Input Field": `${capitalizeFirstLetter(d?.split("_").join(" "))}`,
        "Input Value": `${values[i] ?? ""}`,
    }))

    exportDataToFile({title, formattedData})
}

export const exportExcelFormat = ({excelData, title, extraData}) => {
    const formattedData = [
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

    exportDataToFile({title, formattedData})
}

export const exportDataToFile = ({title, formattedData = []}) => {
    const fileType = "xlsx"
    const product = XLSX.utils.json_to_sheet(formattedData);
    let wb = {Sheets: {data: product}, SheetNames: [`data`]};
    product["!cols"] = [
        {width: 35},
        {width: 50},
        {width: 30},
        {width: 30},
    ];
    const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, `${title ? title : "new_file"}` + ".xlsx")
}
