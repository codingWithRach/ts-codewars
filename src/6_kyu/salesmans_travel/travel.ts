export class G964 {
  public static travel = (r, zipcode) => {
    if (r.length === 0 || zipcode.length === 0) return `${zipcode}:/`;
    const houseNums: Array<String> = [];
    const streetAndTowns: Array<String> = [];
    r.split(",").forEach((address) => {
      const addressDetails = address.split(" ");
      if (
        addressDetails
          .slice(addressDetails.length - zipcode.split(" ").length)
          .join(" ") === zipcode
      ) {
        houseNums.push(addressDetails[0]);
        streetAndTowns.push(
          addressDetails
            .slice(1, addressDetails.length - zipcode.split(" ").length)
            .join(" ")
        );
      }
    });
    return zipcode + ":" + streetAndTowns.join() + "/" + houseNums.join();
  };
}
