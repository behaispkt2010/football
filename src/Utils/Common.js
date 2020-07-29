export const getStatus = (status) => {
  	let strStatus = "";
    if (status == 0) {
      strStatus = "Không hoạt động";
    } else if (status == 1) {
      strStatus = "Hoạt động";
    }
    return strStatus;
}
export const getGender = (idgender) => {
  	let strGender = "";
    if (idgender == 1) {
      strGender = "Nam";
    } else if (idgender == 2) {
      strGender = "Nữ";
    } else if (idgender == 3) {
      strGender = "Không xác định";
    }
    return strGender;
}
