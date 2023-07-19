import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';

export interface CustomerProps {
  avatar?: string | null;
  name: string;
  email: string;
  password?: string | null;
  removed?: Date | null | undefined;
  created_at: Date;
  updated_at: Date;
}

export class Customer {
  private _id: string;
  private props: CustomerProps;
  constructor(
    props: Replace<CustomerProps, { created_at?: Date; updated_at?: Date }>,
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

  public set avatar(avatar: string | undefined | null) {
    this.props.avatar = avatar;
  }

  public get avatar(): string | undefined | null {
    return this.props.avatar;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string | undefined | null) {
    this.props.password = password;
  }

  public get password(): string | undefined | null {
    return this.props.password;
  }

  public remove() {
    this.props.removed = new Date();
  }

  public get removed(): Date | null | undefined {
    return this.props.removed;
  }

  public get created_at(): Date | null | undefined {
    return this.props.created_at;
  }
}
