<?php

namespace App\Filament\Resources\MemberKycs\Tables;

use Filament\Tables;
use Filament\Forms;
use Filament\Tables\Table;
use Filament\Actions\ViewAction;
use Filament\Actions\Action;
use Filament\Schemas\Components\Section;

class MemberKycsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user_id')->label('User ID'),

                Tables\Columns\TextColumn::make('account_beneficiary_name')->label('Name'),

                Tables\Columns\TextColumn::make('account_no'),

                Tables\Columns\TextColumn::make('bank_name'),

                Tables\Columns\TextColumn::make('aadhar_number'),

                Tables\Columns\TextColumn::make('pan_number'),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'approved' => 'success',
                        'rejected' => 'danger',
                        default => 'warning',
                    }),
            ])

            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                    ]),
            ])

            ->actions([

                // 👁 FULL VIEW
                ViewAction::make()
                    ->modalHeading('KYC Full Details')
                    ->modalWidth('7xl')

                    ->form([

                        Section::make('Basic Info')
                            ->columns(2)
                            ->schema([
                                Forms\Components\TextInput::make('user_id')->disabled(),
                                Forms\Components\TextInput::make('account_beneficiary_name')->disabled(),
                                Forms\Components\TextInput::make('account_no')->disabled(),
                                Forms\Components\TextInput::make('ifs_code')->disabled(),
                                Forms\Components\TextInput::make('bank_name')->disabled(),
                                Forms\Components\TextInput::make('branch_name')->disabled(),
                            ]),

                        Section::make('Documents')
                            ->columns(2)
                            ->schema([
                                Forms\Components\TextInput::make('aadhar_number')->disabled(),
                                Forms\Components\TextInput::make('pan_number')->disabled(),
                            ]),

                        Section::make('Verification')
                            ->columns(2)
                            ->schema([
                                Forms\Components\TextInput::make('status')->disabled(),
                                Forms\Components\TextInput::make('otp_verified')->disabled(),
                                Forms\Components\TextInput::make('transaction_password_status')->disabled(),
                                Forms\Components\TextInput::make('transaction_password_checked_at')->disabled(),
                            ]),
                    ]),

                // ✅ APPROVE BUTTON
                Action::make('approve')
                    ->label('Approve')
                    ->color('success')
                    ->icon('heroicon-o-check')
                    ->visible(fn ($record) => $record->status !== 'approved')
                    ->action(fn ($record) => $record->update([
                        'status' => 'approved',
                    ])),

                // ❌ REJECT BUTTON
                Action::make('reject')
                    ->label('Reject')
                    ->color('danger')
                    ->icon('heroicon-o-x-mark')
                    ->visible(fn ($record) => $record->status !== 'rejected')
                    ->action(fn ($record) => $record->update([
                        'status' => 'rejected',
                    ])),
            ])

            ->bulkActions([]);
    }
}