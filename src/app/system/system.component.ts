import {Component, HostBinding} from "@angular/core";
import {fadeStateTrigger} from "../shared/animations/fade.animation";

@Component({
  selector: "ek-system",
  templateUrl: './system.component.html',
  animations: [fadeStateTrigger]
})
export class SystemComponent {
  @HostBinding('@fade') animate = true;
}
