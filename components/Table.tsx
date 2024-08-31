import React from "react";

import isMobile from "is-mobile";
import localFont from "next/font/local";

const Cabinet = localFont({
  src: "../public/font/CabinetGrotesk-Bold.woff",
  display: "swap",
});
export default function Table() {
  const ref = React.useRef<HTMLInputElement>(null);
  const is_mobile = isMobile();

  return (
    <section className="feature_compare snap_block">
      <table>
        <tbody>
          <tr>
            <th></th>
            <td>
              <span className="ln">
                Lightning {is_mobile ? <br />:<> </>}Network
                
              </span>
            </td>
            <td>
              <span className="fn">Fiber Network</span>
            </td>
          </tr>
          <tr>
            <th>Assets</th>
            <td>
              <span className="ln">BTC Only</span>
            </td>
            <td>
              <span className="fn">
              CKB/RGB++
              </span>
            </td>
          </tr>
          <tr>
            <th>Cross Chain Hub</th>
            <td>
              <span className="ln">No</span>
            </td>
            <td>
              <span className="fn">Yes</span>
            </td>
          </tr>
          <tr>
            <th>
              Watchtower  {is_mobile ? <br />:<> </>} 
              Storage*
            </th>
            <td>
              <span className="ln">O(n)</span>
            </td>
            <td>
              <span className="fn">O(1)</span>
            </td>
          </tr>
          <tr>
            <th></th>
            <td colSpan={2} style={{textAlign:'left',paddingTop:'10px'}}>
              *O(n): storage grows with updates.  {is_mobile && <><br /><i style={{visibility:'hidden'}}>*</i></>}O(1): constant storage.
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
