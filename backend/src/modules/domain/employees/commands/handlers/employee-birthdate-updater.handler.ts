//import * as moment from 'moment-timezone';
const moment = require('moment');
import { BaseCommandHandler } from '../../../../common/commands';
import { UpdateEmployeeBirthdate } from '../update-employee-birthdate.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';

@CommandHandler(UpdateEmployeeBirthdate)
@Injectable()
export class EmployeeBirthDateUpdater extends BaseCommandHandler<UpdateEmployeeBirthdate, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: UpdateEmployeeBirthdate): Promise<void> {
    const {
      employeeId,
      birthdate
    } = command;

    const employee = await this.employeeRepository.findById(employeeId);

    employee.birthdate = moment(birthdate)
    .utc()
    //.format(); // error Type 'string' is not assignable to type 'Date'.
    .format('MM-DD-YYYY');

    await this.employeeRepository.save(employee);
  }
}
