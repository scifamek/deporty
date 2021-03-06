import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { hasPermission } from 'src/app/core/helpers/permission.helper';
import { RESOURCES_PERMISSIONS_IT } from 'src/app/init-app';
import { ITeamModel } from '../../../models/team.model';
import { DeleteTeamUsecase } from '../../../usecases/delete-team/delete-team.usecase';
import { GetTeamsUsecase } from '../../../usecases/get-teams/get-teams.usecase';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  static route = 'team-list';
  options: any;
  routes: any;
  $teams!: Observable<ITeamModel[]>;
  constructor(
    private getTeamsUsecase: GetTeamsUsecase,
    private deleteTeamUsecase: DeleteTeamUsecase,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(RESOURCES_PERMISSIONS_IT) private resourcesPermissions: string[]
  ) {
    this.routes = {
      Ver: (team: ITeamModel) => {
        this.router.navigate(['./team'], {
          relativeTo: this.route,
          queryParams: { team: JSON.stringify(team) },
        });
      },
    };

    if (this.isAllowedToDeleteTeam()) {
      this.routes['Eliminar'] = (team: ITeamModel) => {
        this.deleteTeamUsecase.call(team).subscribe(() => {
          this.$teams = this.getTeamsUsecase.call();
        });
      };
    }

    this.options = Object.keys(this.routes);
  }

  isAllowedToDeleteTeam() {
    const identifier = 'tournaments:delete-team:ui';
    return hasPermission(identifier, this.resourcesPermissions);
  }
  ngOnInit(): void {
    this.$teams = this.getTeamsUsecase.call();
  }

  receiveSelectedOption(option: any) {
    const key = this.options[option.index];
    this.routes[key](option.team);
  }
}
