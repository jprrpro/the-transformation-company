import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent, BattleResult } from './app.component';
import { TransformerType } from './domain/transformer';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have a valid battle result given the battle default setup.`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const expected: BattleResult = {
      battles: 6,
      winner: TransformerType.Desepticons,
      winners: [
        'ramjet',
        'thundercracker',
        'mindwipe',
        'razorclaw',
        'shockwave',
      ],
      survivors: ['optimus prime'],
    };

    app.fight();
    fixture.detectChanges();

    expect(app.results).toEqual(expected);
  });

  it(`should give Optimus Prime the win automatically.`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const expected: BattleResult = {battles: 1, winner: 'A', winners: ['optimus prime'], survivors: []};

    app.autobots = app.autobots.filter((x) => x.name === 'optimus prime');
    app.decepticons = app.decepticons.filter((x) => x.name === 'megatron');

    app.fight();
    fixture.detectChanges();

    expect(app.results).toEqual(expected);
  });

  it(`should cancel the battle because Optimus and Predaking were about to fight or they were fighting themselves.`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const expected: BattleResult = {};

    app.autobots = app.autobots.filter((x) => x.name === 'optimus prime');
    app.decepticons = app.autobots.filter((x) => x.name === 'optimus prime');

    app.fight();
    fixture.detectChanges();

    expect(app.results).toEqual(expected);
  });

  // it('should', fakeAsync(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   spyOn(app, 'fight');

  //   let button = fixture.debugElement.nativeElement.querySelector('button');
  //   button.click();
  //   tick();
  //   expect(app.fight).toHaveBeenCalled();

  // }));

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('TheTransformationCompany app is running!');
  // });
});
