import { Injectable } from '@angular/core';

import { BaseClientCode } from './base-client-code';
import { ClientCodeInterface } from './client-code.interface';

@Injectable({ providedIn: 'root' })
export class ClientCodeHelpScoutService extends BaseClientCode implements ClientCodeInterface {
    constructor() {
        super();
    }

    insert(): void {
        this.insertDom(this.script);
    }

    get script(): string {
        return `<script type="text/javascript">!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});</script>
        <script type="text/javascript">window.Beacon('init', 'cba39b3c-19b0-4904-b23c-39b647bb05a0')</script>
        `;
    }
}
