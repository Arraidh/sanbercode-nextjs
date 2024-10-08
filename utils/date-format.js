export default function indonesianDateFormat(time) {
  let tanggalSekarang = new Date(time);
  let formatIndonesia = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(tanggalSekarang);
  console.log(formatIndonesia); // Output: DD/MM/YYYY sesuai dengan tanggalsaat ini
  return formatIndonesia;
}
