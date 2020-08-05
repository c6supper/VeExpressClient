// import { QODataSourceService, QODataResponse } from "galaxy";
// import { Injectable } from "@angular/core";

// @Injectable({
//   providedIn: "root"
// })
// export class LicenseBundleService extends QODataSourceService {
//   protected postponeInitialize() {
//     super.postponeInitialize();
//     this.onChanged().subscribe(_ => {
//       let query = this.getODataQuery();
//       query
//         .entitySet("OELicenseRelation")
//         .get()
//         .subscribe(
//           (odataResponse: QODataResponse) => {
//             this.testsetTypes = odataResponse
//               .toEntitySet<TestsetType>()
//               .getEntities();
//             this.emitOnTypeChanged(this.testsetTypes);
//           },
//           (error: string) => {
//             console.log(error);
//           }
//         );
//     });
//   }
// }
