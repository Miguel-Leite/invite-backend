import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';

export interface EventProps {
  customersId: string;
  logo?: string | null;
  name: string;
  description?: string | null;
  status?: boolean | null;
  startDate: Date;
  endDate: Date;
  removed?: Date | null | undefined;
  created_at: Date;
  updated_at: Date;
}

export class Event {
  private _id: string;
  private props: EventProps;
  constructor(
    props: Replace<EventProps, { created_at?: Date; updated_at?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set customersId(customersId: string) {
    this.props.customersId = customersId;
  }

  public get customersId(): string {
    return this.props.customersId;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set logo(logo: string | undefined | null) {
    this.props.logo = logo;
  }

  public get logo(): string | undefined | null {
    return this.props.logo;
  }

  public set description(description: string | undefined | null) {
    this.props.description = description;
  }

  public get description(): string | undefined | null {
    return this.props.description;
  }

  public remove() {
    this.props.removed = new Date();
  }

  public activate() {
    this.props.status = true;
  }

  public deactivate() {
    this.props.status = false;
  }

  public set endDate(endDate: Date) {
    this.props.endDate = endDate;
  }

  public get endDate(): Date {
    return this.props.endDate;
  }

  public set startDate(startDate: Date) {
    this.props.startDate = startDate;
  }

  public get startDate(): Date {
    return this.props.startDate;
  }

  public get removed(): Date | null | undefined {
    return this.props.removed;
  }

  public get created_at(): Date | null | undefined {
    return this.props.created_at;
  }
}
