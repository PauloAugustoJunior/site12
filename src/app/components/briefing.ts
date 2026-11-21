import { Component, ElementRef, effect, inject, input, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SERVICES, ServiceId, ServiceSelection } from '../data/content';
import { SITE_CONFIG } from '../data/site.config';

@Component({
  selector: 'nexo-briefing',
  imports: [ReactiveFormsModule],
  templateUrl: './briefing.html',
  styleUrl: './briefing.scss',
})
export class Briefing {
  readonly selectedService = input<ServiceSelection | null>(null);
  readonly services = SERVICES;
  readonly contactNotice = SITE_CONFIG.contactNotice;
  readonly generated = signal('');
  readonly feedback = signal('');
  readonly attempted = signal(false);
  readonly resultElement = viewChild<ElementRef<HTMLTextAreaElement>>('resultElement');
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly form = new FormGroup({
    business: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(120)] }),
    service: new FormControl<ServiceId | ''>('', { nonNullable: true, validators: [Validators.required] }),
    objective: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(20), Validators.maxLength(2000)] }),
    timeframe: new FormControl('A definir em conjunto', { nonNullable: true }),
  });

  constructor() {
    effect(() => {
      const selection = this.selectedService();
      if (selection) this.form.controls.service.setValue(selection.id);
    });
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.generated.set('');
      this.feedback.set('');
    });
  }

  invalid(field: 'business' | 'service' | 'objective'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.attempted());
  }

  generate(): void {
    this.attempted.set(true);
    this.form.markAllAsTouched();
    const values = this.form.getRawValue();
    if (values.business.trim().length < 2 || values.objective.trim().length < 20 || this.form.invalid) {
      if (values.business.trim().length < 2) this.form.controls.business.setErrors({ minlength: true });
      if (values.objective.trim().length < 20) this.form.controls.objective.setErrors({ minlength: true });
      this.feedback.set('Revise os campos indicados para gerar seu briefing.');
      setTimeout(() => this.element.nativeElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    const title = SERVICES.find(service => service.id === values.service)?.title ?? '';
    this.generated.set(`BRIEFING DE PROJETO — NEXO\n\nNegócio ou atividade: ${values.business.trim()}\nSolução de interesse: ${title}\nPrevisão desejada: ${values.timeframe}\n\nO QUE PRECISO RESOLVER\n${values.objective.trim()}\n\nPRÓXIMO PASSO\nEste documento foi preparado localmente e não foi enviado. Compartilhe com a Nexo por um canal oficial quando disponível. Escopo, prazo e orçamento serão definidos após análise da necessidade.`);
    this.feedback.set('Seu briefing está pronto. Ele não foi enviado. Baixe ou copie para guardar.');
    setTimeout(() => this.resultElement()?.nativeElement.focus());
  }

  download(): void {
    if (!this.generated()) return;
    const url = URL.createObjectURL(new Blob([this.generated()], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'briefing-projeto-nexo.txt';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    this.feedback.set('Download solicitado. Seu briefing não foi enviado à Nexo.');
  }

  async copy(): Promise<void> {
    try {
      if (!navigator.clipboard) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(this.generated());
      this.feedback.set('Briefing copiado. Agora você pode guardá-lo onde preferir.');
    } catch {
      this.resultElement()?.nativeElement.focus();
      this.resultElement()?.nativeElement.select();
      this.feedback.set('Não foi possível copiar automaticamente. O texto foi selecionado: use o comando de copiar do seu dispositivo ou baixe o arquivo.');
    }
  }
}
