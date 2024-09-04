import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Button from '@/components/ui/Button';
import * as Asset from 'expo-asset';
import { useGetReportDataQuery } from '@/store/services/transactionApi';
import { MonthlyReportListType } from '@/constants/Types';
import Label from '@/components/ui/Label';

type Props = {}

const ReportPdf = (props: Props) => {
  const [pdfUri, setPdfUri] = useState("");
  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  const { data, isFetching, isLoading } = useGetReportDataQuery({})

  useEffect(() => {
    const loadLogo = async () => {

      const asset = Asset.Asset.fromModule(require('@/assets/images/print-line-logo.png'));
      await asset.downloadAsync();
      const base64 = await FileSystem.readAsStringAsync(asset.localUri || asset.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setLogoBase64(`data:image/png;base64,${base64}`);
    };

    loadLogo();
  }, [])

  const generatePdf = async () => {
    if (!logoBase64 && !data) {
      return;
    }
    const htmlContent = `
    <html>
        <head>
          <style>
    @page {
      margin: 10mm;
    }
    body {
      font-family: Arial, sans-serif;
      font-size: 12px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .header img {
      max-height: 70px; /* Adjust based on your image height */
    }
    .header div {
      text-align: right;
    }
    .header div h1 {
      margin: 0;
      font-size: 16px;
    }
    .header div p {
      margin: 0;
      font-size: 12px;
    }
     .report-title {
      text-align: center;
      margin-bottom: 20px;
    }
     .line {
      border-top: 1px solid #000;
      margin: 10px 0 20px; /* Adds space around the line */
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
      color: #333;
    }
  </style>
</head>
<body>

  <div class="header">
    <img src="${logoBase64}" alt="Logo">
    <div>
      <h1>Jamia Nizame e Mustafa (Registered)</h1>
      <p>جامعہ نظام مصطفیٰ ﷺ ٹھٹھی شریف ڈاکخانہ داؤدخیل</p>
      <p>تحصیل وضلع میانوالی پنجاب پاکستان</p>
      <p>Phone no.: 0368642243 Email: info@nizamemustafa.com</p>
    </div>
  </div>
 <div class="line"></div>
    <h2 class="report-title">Monthly Collection Report</h2>
          <table>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Name</th>
                <th>Date</th>
                <th>Mobile Number</th>
                <th>City</th>
                <th>Donation Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((row: MonthlyReportListType) => `
                <tr>
                  <td>${row.sr_no}</td>
                  <td>${row.name}</td>
                  <td>${new Date(row.created_at).toLocaleDateString()}</td>
                  <td>${row.mobile_number}</td>
                  <td>${row.city}</td>
                  <td>${row.donation_type}</td>
                  <td>Rs. ${row.amount}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    setPdfUri(uri)
  };

  const downloadPdf = async () => {
    if (pdfUri) {
      const currentMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
      const pt = `${currentMonth}- Monthly Report`
      try {
        const fileString = await FileSystem.readAsStringAsync(pdfUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (!permissions.granted) {
          return;
        }

        try {
          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            pt + '.pdf',
            "application/pdf"
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, fileString, {
                encoding: FileSystem.EncodingType.Base64,
              });
              console.log("File downloaded successfully")

            })
            .catch((e: any) => {
              console.log(
                "🚀 ~ file: DataPreviewMode.tsx ~ line 99 ~ saveFile ~ e",
                e
              );
            });
        } catch (e: any) {
          console.log(e);
          throw new Error(e);
        }
      } catch (err) {
        console.log(err);
      }

    }
  };


  const sharePdf = async () => {
    if (pdfUri) {
      await shareAsync(pdfUri);
    } else {
      alert('PDF is not generated yet');
    }
  };

  if (isFetching || isLoading) {
    return (<View className='flex-1 items-center justify-center'>
      <ActivityIndicator size="large" color="green" />
      <Label type='xs' weight='medium' className='text-green-700'>Loading...</Label>
    </View>)
  }

  return (
    <>
    
      {!pdfUri && data?.length !== 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <Button
            style={{
              borderWidth: 1,
              borderColor: 'green',
              borderStyle: "dashed",
              borderRadius: 20,
            }}
            textStyle={{
              color: 'green'
            }}
            title="Generate PDF" onPress={generatePdf} className=' w-1/2 h-1/5 rounded-full bg-gray-200'

          />
        </View>

      ) : (
        <View className='flex-1 justify-center items-center gap-y-4'>
          <Button
            style={{
              borderWidth: 1,
              borderColor: 'orange',
              borderStyle: "dashed",
              borderRadius: 20,
            }}
            textStyle={{
              color: 'orange',
              width: "80%",
              textAlign: 'center'
            }}
            title="Download Monthly Report" onPress={downloadPdf} className='w-[50%] h-[22%] rounded-full bg-gray-200'

          />
          <Button
            style={{
              borderWidth: 1,
              borderColor: 'green',
              borderStyle: "dashed",
              borderRadius: 20,
            }}
            textStyle={{
              color: 'green',
              width: "80%",
              textAlign: 'center'
            }}
            title="Share Monthly Report" onPress={sharePdf} className=' w-[50%] h-[22%] rounded-full bg-gray-200'

          />
        </View>
      )}
    </>
  )
}

export default ReportPdf

const styles = StyleSheet.create({})